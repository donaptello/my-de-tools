// const sleep = (ms: number): Promise<void> =>
//   new Promise((resolve) => setTimeout(resolve, ms));

export function timeCheckerExpAuth(exp: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  if (now <= exp) {
    return true;
  }
  return false;
}
