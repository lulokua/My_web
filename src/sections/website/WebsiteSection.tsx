import type { Dictionary, Locale } from "@/content/i18n";
import PageIntro from "@/shared/layout/page/PageIntro";

type WebsiteSectionProps = {
  locale: Locale;
  dictionary: Dictionary["website"];
};

export default function WebsiteSection({ locale, dictionary }: WebsiteSectionProps) {
  return (
    <div className="min-h-[calc(100dvh-64px)] bg-[#F3F1EC] text-zinc-900 selection:bg-black/10 sm:min-h-[calc(100dvh-84px)]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20 lg:py-32">
        <PageIntro
          locale={locale}
          backLabel={dictionary.backHome}
          title={dictionary.title}
          subtitle={dictionary.subtitle}
        />
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5 sm:p-8">
          <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">{dictionary.body}</p>
        </div>
      </div>
    </div>
  );
}
