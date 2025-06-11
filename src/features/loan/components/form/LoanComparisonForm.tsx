"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { loanComparisonSchema } from "../../schemas/loanSchema";
import { LoanComparisonRequest } from "../../types/loanTypes";
import { Calculator, User, Mail, Phone, Euro, Calendar } from "lucide-react";

interface LoanComparisonFormProps {
  onSubmit: (data: LoanComparisonRequest) => void;
  isLoading?: boolean;
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

export function LoanComparisonForm({ onSubmit, isLoading }: LoanComparisonFormProps) {
  const t = useTranslations("loan.form");
  const formSchema = loanComparisonSchema(t);

  const form = useForm<LoanComparisonRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 50000,
      duration: 20,
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleSubmit = (data: LoanComparisonRequest) => {
    onSubmit(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          {t("title") || "Simuler votre prêt"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold">
                      <Euro className="w-4 h-4 text-primary" />
                      {t("amount") || "Montant du prêt"} <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t("selectAmount") || "Sélectionnez un montant"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {AMOUNT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold">
                      <Calendar className="w-4 h-4 text-primary" />
                      {t("duration") || "Durée du prêt"} <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t("selectDuration") || "Sélectionnez une durée"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DURATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold">
                      <User className="w-4 h-4 text-primary" />
                      {t("name") || "Nom complet"} <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("namePlaceholder") || "Votre nom complet"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold">
                      <Mail className="w-4 h-4 text-primary" />
                      {t("email") || "Email"} <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("emailPlaceholder") || "votre@email.com"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold">
                      <Phone className="w-4 h-4 text-primary" />
                      {t("phone") || "Téléphone"} <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder={t("phonePlaceholder") || "06 12 34 56 78"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {isLoading ? (
                  t("comparing") || "Comparaison en cours..."
                ) : (
                  t("compare") || "Comparer les offres"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
