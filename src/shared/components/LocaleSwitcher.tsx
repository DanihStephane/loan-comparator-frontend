"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="relative inline-block">
      <select
        value={locale}
        onChange={handleChange}
        className="appearance-none p-2 rounded-md bg-secondary text-white cursor-pointer border border-secondary"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc} className="bg-black text-white">
            {loc === "fr" ? "🇫🇷" : "🇬🇧"}
          </option>
        ))}
      </select>
    </div>
  );
}
