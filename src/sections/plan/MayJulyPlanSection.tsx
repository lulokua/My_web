import type { Dictionary, Locale } from "@/content/i18n";
import PageIntro from "@/shared/layout/page/PageIntro";

type MayJulyPlanSectionProps = {
  locale: Locale;
  dictionary: Dictionary["plan"]["mayJuly"];
};

export default function MayJulyPlanSection({ locale, dictionary }: MayJulyPlanSectionProps) {
  return (
    <div className="min-h-[calc(100dvh-64px)] bg-[#F3F1EC] text-zinc-900 selection:bg-black/10 sm:min-h-[calc(100dvh-84px)]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:py-20">
        <PageIntro
          locale={locale}
          backHref="/plan"
          backLabel={dictionary.backLabel}
          title={dictionary.title}
          subtitle={dictionary.subtitle}
          align="center"
        />

        <div className="space-y-4 sm:space-y-6">
          {dictionary.sections.map((section) => (
            <div
              key={section.heading}
              className="rounded-2xl bg-white p-6 ring-1 ring-black/5 sm:p-8"
            >
              <h2 className="mb-3 text-base font-semibold text-zinc-900 sm:mb-4 sm:text-lg">
                {section.heading}
              </h2>
              <ul className="list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-zinc-600">
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
