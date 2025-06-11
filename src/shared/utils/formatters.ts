export const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  // Créer une date en UTC en préservant les heures exactes
  const date = new Date(dateString);

  // Formater manuellement pour éviter la conversion de fuseau horaire
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatCurrency = (
  amount: string | number,
  currency: string
): string => {
  // Default to EUR if currency is missing or invalid
  const validCurrency = currency && /^[A-Z]{3}$/.test(currency) ? currency : "EUR";
  
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: validCurrency,
    }).format(Number(amount));
  } catch (error) {
    // Fallback formatting if Intl.NumberFormat fails
    return `${Number(amount).toFixed(2)} ${validCurrency}`;
  }
};

export const getNumberOfDays = (startDate: Date, endDate: Date) => {
  // Calculer la différence en millisecondes
  const diffTime = endDate.getTime() - startDate.getTime();
  // Convertir en jours (1000 ms * 60 s * 60 min * 24 h)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(1, diffDays);
};
