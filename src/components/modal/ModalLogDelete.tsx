import { AnimatePresence, motion } from "framer-motion";

interface Props {
  selected: string | null;
  darkMode: boolean;
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (value: boolean) => void;
  onConfirm?: (mode: string | null, withError: boolean) => void;
}

export default function ModalLogDelete({
  selected,
  darkMode,
  showDeleteConfirm,
  setShowDeleteConfirm,
  onConfirm,
}: Props) {
  return (
    <AnimatePresence>
      {showDeleteConfirm ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowDeleteConfirm(false)}
            />

            <div
              className={`relative z-10 w-full max-w-md rounded-xl p-6 shadow-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">
                Delete Log Apache Hop
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete all log?
                <span className="font-medium">{}</span>? <br /> This action
                cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className={`rounded-md px-4 py-2 text-xs ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    onConfirm?.(selected, false);
                  }}
                  className="rounded-md bg-red-600 px-4 py-2 text-xs text-white hover:bg-red-500"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    onConfirm?.(selected, true);
                  }}
                  className="rounded-md bg-red-600 px-4 py-2 text-xs text-white hover:bg-red-500"
                >
                  Delete with Errors
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
}
