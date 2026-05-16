import { redirect } from "next/navigation";

import { defaultLocale } from "@/content/i18n";

export default function HomeRedirect() {
  redirect(`/${defaultLocale}`);
}
