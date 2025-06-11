"use client";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";

const PhoneInputClient = dynamic(
  () => import("./phone-input-client").then((mod) => mod.PhoneInputClient),
  { ssr: false }
);

interface CustomPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  defaultCountry?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function CustomPhoneInput({
  value,
  onChange,
  label,
  error,
  defaultCountry = "FR",
  disabled = false,
  required = false,
  className,
}: CustomPhoneInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <div className="relative">
        <PhoneInputClient
          value={value}
          onChange={onChange}
          defaultCountry={defaultCountry}
          disabled={disabled}
          required={required}
          className={cn(
            "flex h-12 w-full rounded-md border border-input bg-background text-base",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            "[&_.PhoneInputCountry]:px-3 [&_.PhoneInputCountry]:mr-2",
            "[&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:py-2",
            "[&_.PhoneInputCountrySelect]:bg-background [&_.PhoneInputCountrySelect]:border-input",
            "[&_.PhoneInputCountrySelectArrow]:text-foreground [&_.PhoneInputCountrySelectArrow]:opacity-70",
            "[&_.PhoneInputCountryList]:bg-background [&_.PhoneInputCountryList]:border [&_.PhoneInputCountryList]:border-input [&_.PhoneInputCountryList]:rounded-md",
            "[&_.PhoneInputCountryList]:shadow-md [&_.PhoneInputCountryList]:mt-1",
            "[&_.PhoneInputCountryList_li]:px-2 [&_.PhoneInputCountryList_li]:py-1 [&_.PhoneInputCountryList_li:hover]:bg-accent",
            "[&_.PhoneInputCountryList_li-search]:p-2 [&_.PhoneInputCountryList_li-search_input]:w-full [&_.PhoneInputCountryList_li-search_input]:border [&_.PhoneInputCountryList_li-search_input]:rounded-md [&_.PhoneInputCountryList_li-search_input]:p-2",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
        />
      </div>
      {error && (
        <FormMessage className="text-sm text-destructive">{error}</FormMessage>
      )}
    </div>
  );
}
