"use client";

import { Toaster } from "@/components/ui/sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      expand={false}
      richColors
      closeButton
      theme="system"
    />
  );
}
