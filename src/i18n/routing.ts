import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { ROUTES } from "@/shared/config/routes";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "fr",
  pathnames: {
    [ROUTES.HOME]: "/",
    [ROUTES.LOAN_COMPARISON]: {
      en: "/loan-comparison",
      fr: "/comparaison-pret",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
