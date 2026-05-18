import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const BILIBILI_API = "https://api-v2.cenguigui.cn/api/bilibili/bilibili.php";
const JSON_TIMEOUT_MS = 8_000;
const SAFE_PORTS = new Set(["", "80", "443"]);
const ALLOWED_AUDIO_HOSTS = ["bilivideo.com", "hdslb.com", "akamaized.net"];

function jsonError(message: string, status: number) {
  return NextResponse.json({ code: status, message }, { status });
}

function isAllowedHostname(hostname: string) {
  const normalizedHostname = hostname.toLowerCase();

  return ALLOWED_AUDIO_HOSTS.some((allowedHost) => {
    return (
      normalizedHostname === allowedHost ||
      normalizedHostname.endsWith(`.${allowedHost}`)
    );
  });
}

function parseAudioUrl(rawUrl: string | null) {
  if (!rawUrl) return null;

  try {
    const parsed = new URL(rawUrl.trim());
    const protocol = parsed.protocol.toLowerCase();

    if (protocol !== "https:" && protocol !== "http:") return null;
    if (!SAFE_PORTS.has(parsed.port)) return null;
    if (parsed.username || parsed.password) return null;
    if (!isAllowedHostname(parsed.hostname)) return null;

    return parsed.toString();
  } catch {
    return null;
  }
}

function parseBvid(rawBvid: string | null) {
  const bvid = rawBvid?.trim();

  if (!bvid || !/^BV[0-9A-Za-z]{10}$/.test(bvid)) {
    return null;
  }

  return bvid;
}

function getStringField(value: unknown, keys: string[]) {
  if (!value || typeof value !== "object") return null;

  const record = value as Record<string, unknown>;

  for (const key of keys) {
    const field = record[key];
    if (typeof field === "string" && field.trim()) {
      return field;
    }
  }

  return null;
}

async function fetchBilibiliJson(url: URL) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
    },
    signal: AbortSignal.timeout(JSON_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Bilibili API returned ${response.status}`);
  }

  return response.json() as Promise<Record<string, unknown>>;
}

async function resolveAudioUrlByBvid(bvid: string) {
  const url = new URL(BILIBILI_API);
  url.searchParams.set("action", "media");
  url.searchParams.set("bvid", bvid);
  url.searchParams.set("quality", "standard");
  url.searchParams.set("audio_only", "1");

  const payload = await fetchBilibiliJson(url);
  const data = payload.data;
  const rawAudioUrl = getStringField(data, ["audio_url", "audio", "url"]);
  const audioUrl = parseAudioUrl(rawAudioUrl);

  if (!audioUrl) {
    throw new Error("Bilibili API did not return a valid audio URL");
  }

  return audioUrl;
}

function copyStreamHeaders(upstreamHeaders: Headers) {
  const headers = new Headers();
  const passthroughHeaders = [
    "accept-ranges",
    "content-length",
    "content-range",
    "etag",
    "last-modified",
  ];

  for (const header of passthroughHeaders) {
    const value = upstreamHeaders.get(header);
    if (value) headers.set(header, value);
  }

  headers.set("Content-Type", "audio/mp4");
  headers.set("Cache-Control", "no-store");
  headers.set("X-Content-Type-Options", "nosniff");

  return headers;
}

async function streamAudio(request: NextRequest) {
  const bvid = parseBvid(request.nextUrl.searchParams.get("bvid"));
  const rawUrl = request.nextUrl.searchParams.get("url");
  const audioUrl = bvid ? await resolveAudioUrlByBvid(bvid) : parseAudioUrl(rawUrl);

  if (!audioUrl) {
    return jsonError("Missing or invalid Bilibili audio source.", 400);
  }

  const headers: HeadersInit = {
    Accept: "*/*",
    "Accept-Encoding": "identity",
    Referer: bvid ? `https://www.bilibili.com/video/${bvid}` : "https://www.bilibili.com/",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
  };
  const range = request.headers.get("range");

  if (range) {
    headers.Range = range;
  }

  const upstream = await fetch(audioUrl, {
    cache: "no-store",
    headers,
  });

  if (!upstream.ok && upstream.status !== 206) {
    return jsonError(`Bilibili audio request failed: ${upstream.status}`, 502);
  }

  if (!upstream.body) {
    return jsonError("Bilibili audio response has no body.", 502);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: copyStreamHeaders(upstream.headers),
  });
}

async function getMedia(request: NextRequest) {
  const bvid = parseBvid(request.nextUrl.searchParams.get("bvid"));

  if (!bvid) {
    return jsonError("Missing or invalid bvid.", 400);
  }

  try {
    const audioUrl = await resolveAudioUrlByBvid(bvid);
    const proxiedAudioUrl = `/api/bilibili-music?action=stream&bvid=${encodeURIComponent(bvid)}`;

    return NextResponse.json({
      code: 200,
      data: {
        audio_url: proxiedAudioUrl,
        audio: proxiedAudioUrl,
        url: proxiedAudioUrl,
        raw_audio_url: audioUrl,
      },
    });
  } catch (error) {
    console.error("Bilibili media resolve failed:", error);
    return jsonError("Unable to resolve Bilibili audio.", 502);
  }
}

async function searchMusic(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")?.trim();
  const limit = request.nextUrl.searchParams.get("limit") || "10";

  if (!query || query.length > 80) {
    return jsonError("Missing or invalid search query.", 400);
  }

  const url = new URL(BILIBILI_API);
  url.searchParams.set("action", "search");
  url.searchParams.set("query", query);
  url.searchParams.set("limit", limit);
  url.searchParams.set("type", "music");

  try {
    const payload = await fetchBilibiliJson(url);
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Bilibili search failed:", error);
    return jsonError("Unable to search Bilibili music.", 502);
  }
}

export async function GET(request: NextRequest) {
  const action = request.nextUrl.searchParams.get("action") || "stream";

  try {
    if (action === "search") return searchMusic(request);
    if (action === "media") return getMedia(request);
    if (action === "stream" || action === "proxy") return streamAudio(request);

    return jsonError("Unsupported action.", 400);
  } catch (error) {
    console.error("Bilibili music route failed:", error);
    return jsonError("Bilibili music request failed.", 500);
  }
}
