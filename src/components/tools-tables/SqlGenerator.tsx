import { useState } from "react";

interface Props {
  selectedTable: string;
  selectedColumns: string[];
  darkMode: boolean;
}

export default function SqlGenerator({
  selectedTable,
  selectedColumns,
  darkMode,
}: Props) {
  const [copied, setCopied] = useState(false);

  const generateSql = (): string => {
    if (!selectedTable || selectedColumns.length === 0)
      return "--- No SQL Generated ---";
    const cols = selectedColumns.map((c) => `  ${c} VARCHAR(255)`).join(",\n");

    return `CREATE TABLE ${selectedTable} (\n${cols}\n);`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSql());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-5 transition hover:shadow-2xl hover:-translate-y-1`}>
        <div className="flex justify-between items-center mb-3">
            <h3 className={`text-lg font-semibold text-gray-800 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Generated SQL
            </h3>

            <button
                onClick={copyToClipboard}
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
            >
                {copied ? "Copied!" : "Copy"}
            </button>
        </div>

        <textarea
            readOnly
            className={`w-full h-80 border rounded p-3 ${darkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-gray-50'} font-mono text-sm focus:ring focus:ring-blue-300`}
            value={generateSql()}
        />
    </div>
  );
}
