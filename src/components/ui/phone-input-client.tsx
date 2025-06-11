"use client";

import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface PhoneInputClientProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  defaultCountry?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function PhoneInputClient({
  value,
  onChange,
  label,
  error,
  defaultCountry = "FR",
  disabled = false,
  required = false,
  className,
}: PhoneInputClientProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <PhoneInput
        international
        defaultCountry={"FR"}
        value={value}
        onChange={(value) => onChange(value || "")}
        disabled={disabled}
        required={required}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background text-sm",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      />
      {error && (
        <FormMessage className="text-sm text-destructive">{error}</FormMessage>
      )}
    </div>
  );
}
