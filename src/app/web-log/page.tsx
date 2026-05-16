import { redirect } from "next/navigation";

import { defaultLocale } from "@/content/i18n";

export default function WebLogRedirect() {
  redirect(`/${defaultLocale}/web-log`);
}
