import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const serverLogger = (): Plugin => ({
  name: "server-logger",
  configureServer(server) {
    server.httpServer?.once("listening", () => {
      const address = server.httpServer?.address();

      if (!address || typeof address === "string") {
        console.log("\nDev server started.");
        return;
      }

      const protocol = server.config.server.https ? "https" : "http";
      const port = address.port;
      const host = server.config.server.host || "localhost";
      const displayHost = host === true || host === "0.0.0.0" ? "localhost" : host;

      console.log("\nDev server started.");
      console.log(`Local: ${protocol}://${displayHost}:${port}/`);
    });
  },
});

export default defineConfig({
  plugins: [react(), serverLogger()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
