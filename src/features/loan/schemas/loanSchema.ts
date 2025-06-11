import * as z from "zod";

export const loanComparisonSchema = (t: (key: string) => string) =>
  z.object({
    amount: z.number({
      required_error: t("validation.amount.required"),
    }).min(50000, t("validation.amount.min")),
    duration: z.number({
      required_error: t("validation.duration.required"),
    }).min(15, t("validation.duration.min")),
    name: z.string()
      .min(2, t("validation.name.minLength"))
      .max(100, t("validation.name.maxLength")),
    email: z.string()
      .email(t("validation.email.invalid"))
      .min(1, t("validation.email.required")),
    phone: z.string()
      .min(10, t("validation.phone.minLength"))
      .regex(/^[0-9+\-\s()]+$/, t("validation.phone.invalid")),
  });

export type LoanComparisonFormValues = z.infer<ReturnType<typeof loanComparisonSchema>>;