export const formatBirthday = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  const year = numbers.slice(0, 4);
  const month = numbers.slice(4, 6);
  const day = numbers.slice(6, 8);
  return [year, month, day].filter(Boolean).join("-");
};
