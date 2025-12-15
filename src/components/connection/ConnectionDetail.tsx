import { ConnectionData } from "../../services/types/Connections.types";

interface Props {
  connection?: ConnectionData;
  darkMode: boolean;
}

export default function ConnectionDetail({ connection, darkMode }: Props) {
  if (!connection) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        Select a connection to view details
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl p-3 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } shadow-sm border border-transparent h-full`}
    >
      <div className="flex flex-col h-full space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {connection.name}
          </h2>
          <p className="text-sm text-gray-500">{connection.type}</p>
        </div>

        <textarea
          className="
          flex-1 w-full resize-none rounded-xl border
          p-4 text-sm
          bg-gray-50 dark:bg-gray-800
          border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
          value={connection.description}
          readOnly
        />
      </div>
    </div>
  );
}
