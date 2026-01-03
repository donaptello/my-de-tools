import { ConnectionData } from "../../services/types/Connections.types";

interface Props {
  connection?: ConnectionData;
  darkMode: boolean;
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (value: boolean) => void;
}

export default function ModalValidationDelete({
  connection,
  darkMode,
  showDeleteConfirm,
  setShowDeleteConfirm,
}: Props) {
  console.info(showDeleteConfirm);
  return (
    <div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDeleteConfirm(false)}
          />

          {/* Modal */}
          <div
            className={`relative z-10 w-full max-w-md rounded-xl p-6 shadow-lg ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">Delete Connection</h3>

            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-medium">{connection?.name}</span>? This
              action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className={`rounded-md px-4 py-2 text-sm ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  // 🔥 panggil API delete di sini
                  console.log("DELETE", connection?.id);
                }}
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
