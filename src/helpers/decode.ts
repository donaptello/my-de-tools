import pako from "pako";

export function decodeLogString(logString: string | undefined): string[] {
  try {
    if (!logString) {
      return [];
    }
    const clean = logString.replace(/\r?\n/g, "");
    const binaryString = atob(clean);
    const bytes = new Uint8Array(
      Array.from(binaryString, (char) => char.charCodeAt(0)),
    );
    const result = pako.ungzip(bytes, { to: "string" });

    return result.split("\n");
  } catch (error) {
    console.error("Decode error:", error);
    return [];
  }
}
