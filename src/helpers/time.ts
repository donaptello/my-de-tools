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
  dateString: string | undefined,
  type?: string,
): string | null {
  if (!dateString) return null;

  const date = new Date(dateString);

  // ambil bagian date (WIB)
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  // ambil bagian time (WIB)
  const timeParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (parts: Intl.DateTimeFormatPart[], type: string) =>
    parts.find((p) => p.type === type)?.value || "00";

  const yyyy = get(dateParts, "year");
  const MM = get(dateParts, "month");
  const dd = get(dateParts, "day");

  const HH = get(timeParts, "hour");
  const mm = get(timeParts, "minute");
  const ss = get(timeParts, "second");

  if (type === "yy/mm/dd") {
    return `${dd}/${MM}/${yyyy}`;
  } else if (type === "HH.mm.ss") {
    return `${HH}.${mm}.${ss}`;
  }

  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}
