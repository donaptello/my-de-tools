// const sleep = (ms: number): Promise<void> =>
//   new Promise((resolve) => setTimeout(resolve, ms));

export function timeCheckerExpAuth(exp: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  if (now <= exp) {
    return true;
  }
  return false;
}

export function formatDate(
  dateString: string,
  type: string | undefined = undefined,
): string {
  const date = new Date(dateString);

  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDay()).padStart(2, "0");

  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  if (type !== undefined && type === "yy/mm/dd") {
    return `${dd}/${MM}/${yyyy}`;
  }
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}
