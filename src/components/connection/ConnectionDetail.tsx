import { PencilIcon, Trash } from "lucide-react";
import {
  ConnectionData,
  GeneralConnection,
  S3Connection,
} from "../../services/types/Connections.types";
import ConnectionForm from "./ConnectionForm";

interface Props {
  connection?: ConnectionData;
  darkMode: boolean;
  isAdding?: boolean;
  onCancel?: () => void;
  onCreate?: (conn: ConnectionData) => void;
  setShowDeleteConfirm: (value: boolean) => void;
}

export default function ConnectionDetail({
  connection,
  darkMode,
  isAdding,
  onCancel,
  onCreate,
  setShowDeleteConfirm,
}: Props) {
  if (!connection && !isAdding) {
    return (
      <div
        className={`
        flex rounded-xl shadow-sm p-5 
        transition hover:shadow-2xl 
        hover:-translate-y-1 h-full 
        items-center justify-center 
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
      >
        Select a connection to view details
      </div>
    );
  }

  if (isAdding && !connection) {
    return (
      <>
        <ConnectionForm
          isAdding={isAdding}
          darkMode={darkMode}
          onCancel={onCancel}
          onCreate={onCreate}
        />
      </>
    );
  }
  function resultText(conn: ConnectionData): string {
    const title = (conn.name ?? "").toUpperCase().replace(/\s+/g, "_");

    const common = conn.configuration as { host?: string; port?: number };
    const base: string[] = [
      `[${title}]`,
      `HOST=${common.host ?? ""}`,
      `PORT=${common.port ?? ""}`,
    ];

    if (conn.type === "S3") {
      const s3 = conn.configuration as S3Connection;
      base.push(
        `ACCESS_KEY=${s3.accessKey ?? ""}`,
        `SECRET_KEY=${s3.secretKey ?? ""}`
      );
    } else {
      const general = conn.configuration as GeneralConnection;
      base.push(
        `USERNAME=${general.username ?? ""}`,
        `PASSWORD=${general.password ?? ""}`,
        `DATABASE=${general.database ?? ""}`
      );
    }

    return base.join("\n");
  }

  return (
    <div
      className={`rounded-xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm border border-transparent h-full
        transition hover:shadow-2xl hover:-translate-y-1`}
    >
      <div className="flex flex-col h-full space-y-4">
        <div>
          <div className="flex justify-between">
            <h2
              className={`
            text-xl font-semibold 
            ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              {connection!.name}
            </h2>
            <div className="flex justify-end">
              <button
                type="button"
                className={`mr-2 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-yellow-600 text-white hover:bg-yellow-500 focus:ring-yellow-400"
                    : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 focus:ring-yellow-200"
                }`}
              >
                <PencilIcon className="h-4 w-4" />
                Update
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-red-600 text-white hover:bg-red-500 focus:ring-red-400"
                    : "bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-200"
                }`}
              >
                <Trash className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500">{connection!.type}</p>
        </div>

        <textarea
          className={`w-full border rounded p-3 
            ${
              darkMode
                ? "text-gray-300 bg-gray-700"
                : "text-gray-700 bg-gray-50"
            } 
            font-mono text-sm focus:ring focus:ring-blue-300 flex-1 min-h-0 
            resize-none overflow-auto`}
          value={resultText(connection!)}
          readOnly
        />
      </div>
    </div>
  );
}
