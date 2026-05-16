import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, GraduationCap, Briefcase, FileText, Target } from "lucide-react";

import type { Dictionary } from "@/content/i18n";
import { getLocalizedPath, type Locale } from "@/content/i18n";

type AboutSectionProps = {
  locale: Locale;
  dictionary: Dictionary["about"];
};

export default function AboutSection({ locale, dictionary }: AboutSectionProps) {
  const { sections } = dictionary;

  return (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col items-center bg-[#F9F8F6] text-zinc-900 sm:min-h-[calc(100dvh-84px)]">
      <header className="relative w-full shrink-0">
        <div className="relative aspect-[21/9] w-full md:aspect-[3/1] lg:aspect-[4/1]">
          <Image
            src="https://my-blog.cn-nb1.rains3.com/My_web/about.png"
            alt={dictionary.headerAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F6] via-black/20 to-black/30" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl">
            {dictionary.name}
          </h1>
          {dictionary.subtitle && (
            <p className="text-lg font-medium text-white/80 drop-shadow sm:text-xl">
              {dictionary.subtitle}
            </p>
          )}
        </div>
      </header>

      <div className="relative w-full max-w-3xl space-y-12 px-4 pb-12 sm:pb-24">
        <div className="flex justify-center -mt-16 sm:-mt-20">
          <Image
            src={dictionary.avatar}
            alt={dictionary.name}
            width={120}
            height={120}
            className="rounded-full bg-zinc-100 shadow-lg ring-4 ring-[#F9F8F6]"
          />
        </div>
        {dictionary.bio && (
          <p className="text-center max-w-xl mx-auto text-[15px] leading-relaxed text-zinc-600">
            {dictionary.bio}
          </p>
        )}

        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-12 space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-zinc-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                <User className="h-4 w-4" />
              </span>
              {sections.introduction.title}
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-zinc-600">
              {sections.introduction.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Educations */}
          <section>
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-zinc-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                <GraduationCap className="h-4 w-4" />
              </span>
              {sections.educations.title}
            </h2>
            <div className="space-y-4">
              {sections.educations.items.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl bg-zinc-50 p-4">
                  <span className="font-medium text-zinc-900">{item.school}</span>
                  <span className="text-sm font-medium text-zinc-500">{item.duration}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Experiences */}
          <section>
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-zinc-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                <Briefcase className="h-4 w-4" />
              </span>
              {sections.experiences.title}
            </h2>
            <div className="space-y-4">
              {sections.experiences.items.map((item, index) => (
                <div key={index} className="rounded-2xl bg-zinc-50 p-4 text-[15px] leading-relaxed text-zinc-600">
                  {item.content}
                </div>
              ))}
            </div>
          </section>

          {/* Publications */}
          <section>
            <h2 className="mb-2 flex items-center gap-2 text-xl font-bold text-zinc-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                <FileText className="h-4 w-4" />
              </span>
              {sections.publications.title}
            </h2>
            <p className="mb-6 text-sm text-zinc-500">{sections.publications.description}</p>
            <div className="space-y-4">
              {sections.publications.items.map((item, index) => (
                <div key={index} className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-bold text-zinc-900">{item.title}</h3>
                  <div className="mb-4 text-sm font-medium text-zinc-500">{item.venueAndYear}</div>
                  <p className="mb-6 text-[15px] leading-relaxed text-zinc-600">
                    <strong className="font-medium text-zinc-900">{item.abstractLabel}</strong>
                    {item.abstract}
                  </p>
                  <div className="flex">
                    <Link
                      href={item.linkUrl}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                    >
                      {item.linkText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dream Company */}
          <section>
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-zinc-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                <Target className="h-4 w-4" />
              </span>
              {sections.dreamCompany.title}
            </h2>
            <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 ring-1 ring-orange-100">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-xl font-bold text-white shadow-sm">
                  MI
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">{sections.dreamCompany.company}</h3>
                  {sections.dreamCompany.nativeName && (
                    <span className="text-sm font-medium text-zinc-500">{sections.dreamCompany.nativeName}</span>
                  )}
                </div>
              </div>
              <p className="mb-4 text-[15px] leading-relaxed text-zinc-700">
                {sections.dreamCompany.description}
              </p>
              <div className="rounded-xl bg-white/60 p-4 text-sm font-medium text-orange-800">
                {sections.dreamCompany.goal}
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-center">
          <Link
            href={getLocalizedPath(locale)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-zinc-600 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {dictionary.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
