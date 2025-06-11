export const handleErrorMessage = (
  t: (key: string) => string,
  er: { errors?: Record<string, string>; code?: string },
  status: number
) => {
  if (er?.errors && Object.keys(er.errors).length > 0) {
    let $message = "";
    Object.entries(er.errors).forEach(([field, errorCode]) => {
      $message += `${t(`${errorCode}`)}\n`;
    });
    return $message;
  }
  if (er?.code) {
    return t(`${er.code}`);
  } else {
    return t("default");
  }
};
