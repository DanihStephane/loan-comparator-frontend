"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Filter, Euro, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

interface LoanFiltersProps {
  amount: number;
  duration: number;
  onFiltersChange: (amount: number, duration: number) => void;
}

const AMOUNT_OPTIONS = [
  { value: 50000, label: "50 000 €" },
  { value: 100000, label: "100 000 €" },
  { value: 200000, label: "200 000 €" },
  { value: 500000, label: "500 000 €" },
];

const DURATION_OPTIONS = [
  { value: 15, label: "15 ans" },
  { value: 20, label: "20 ans" },
  { value: 25, label: "25 ans" },
];

export function LoanFilters({ amount, duration, onFiltersChange }: LoanFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempAmount, setTempAmount] = useState(amount);
  const [tempDuration, setTempDuration] = useState(duration);
  const t = useTranslations("loan.filters");

  const handleApplyFilters = () => {
    onFiltersChange(tempAmount, tempDuration);
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempAmount(50000);
    setTempDuration(20);
    onFiltersChange(50000, 20);
  };

  return (
    <Card className="w-full mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                {t("title") || "Filtrer les taux"}
              </div>
              <ChevronDown 
                className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} 
              />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Euro className="w-4 h-4 text-primary" />
                  {t("amount") || "Montant du prêt"}
                </label>
                <Select
                  value={tempAmount.toString()}
                  onValueChange={(value) => setTempAmount(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AMOUNT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-primary" />
                  {t("duration") || "Durée du prêt"}
                </label>
                <Select
                  value={tempDuration.toString()}
                  onValueChange={(value) => setTempDuration(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATION_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={handleReset}
                size="sm"
              >
                {t("reset") || "Réinitialiser"}
              </Button>
              <Button
                onClick={handleApplyFilters}
                size="sm"
                className="bg-primary text-white hover:bg-primary/90"
              >
                {t("apply") || "Appliquer"}
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}