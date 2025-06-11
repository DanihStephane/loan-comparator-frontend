"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flag } from "lucide-react";
import { Control } from "react-hook-form";

// Import i18n-iso-countries
import countries from "i18n-iso-countries";
import countriesEn from "i18n-iso-countries/langs/en.json";
import countriesFr from "i18n-iso-countries/langs/fr.json";

// Register the languages
countries.registerLocale(countriesEn);
countries.registerLocale(countriesFr);

type CountryOption = {
  value: string;
  label: string;
};

interface CountrySelectProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  disabled?: boolean; // Nouvelle prop pour désactiver le select
  defaultCountry?: string; // Nouvelle prop pour définir le pays par défaut
}
export function CountrySelect({
  control,
  name,
  label,
  placeholder,
  required = false,
  className = "",
  disabled = false,
  defaultCountry = "",
}: CountrySelectProps) {
  const params = useParams();
  const locale = (params.locale as string) || "fr";
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);

  useEffect(() => {
    // Get countries based on locale
    const langCode = locale === "fr" ? "fr" : "en";
    const countryObj = countries.getNames(langCode);

    const options = Object.entries(countryObj)
      .map(([code, name]) => ({
        value: code,
        label: name as string,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    setCountryOptions(options);
  }, [locale]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        useEffect(() => {
          if (!field.value && defaultCountry) {
            field.onChange(defaultCountry);
          }
        }, [field, defaultCountry]);

        return (
          <FormItem className={className}>
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-primary" />
              <FormLabel className="text-sm font-semibold text-[#0d0c0c]">
                {label} {required && "*"}
              </FormLabel>
            </div>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={field.value || defaultCountry}
                defaultValue={field.value || defaultCountry}
                disabled={disabled}
              >
                <SelectTrigger
                  className={`w-full bg-muted border border-border rounded-[5px] ${
                    disabled ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-[200px]">
                  {countryOptions.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
