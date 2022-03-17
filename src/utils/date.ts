export function convertDDMMYYYYtoYYYYMMDD(date: string): string {
  const dateArray = date.split("-");
  return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
}
