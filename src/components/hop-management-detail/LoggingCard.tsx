import { Terminal } from "lucide-react";
import { decodeLogString } from "../../helpers/decode";

type LoggingHopProps = {
  darkMode: boolean;
  loading: boolean;
  loggingString: string | undefined;
};

export default function LoggingHop({
  darkMode,
  loggingString,
}: LoggingHopProps) {
  const logStringParsed: string[] = decodeLogString(loggingString);
  return (
    <div
      className={`flex-1 rounded-xl border shadow-sm ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="p-4 flex items-center border-b border-gray-200 justify-between">
        <div className="flex items-center gap-3">
          <Terminal size={16} className="text-gray-500" />
          <h2 className="font-medium text-base">Log Output</h2>
        </div>
        <div className="border rounded-full font-medium border-gray-200">
          <span className="px-3 py-1 text-xs">
            {logStringParsed.length} lines
          </span>
        </div>
      </div>
      <div className="max-h-[300px] overflow-y-auto font-mono text-xs pt-3 px-4 text-gray-500">
        {logStringParsed.length === 0 ? (
          <div className="p-4 text-gray-400 text-sm">No logs available</div>
        ) : (
          logStringParsed.map((line, index) => (
            <div
              key={index}
              className={`px-4 py-1 whitespace-pre-wrap`}
            >
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
