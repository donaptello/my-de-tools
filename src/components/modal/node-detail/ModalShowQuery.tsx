import { AnimatePresence, motion } from "framer-motion";
import type { PipelineNodeData } from "../../../components/hop-management-dir/GraphNodeCard";
import { SettingsIcon } from "lucide-react";

interface Props {
  darkMode: boolean;
  showModalNodeDetail: boolean;
  data: PipelineNodeData | null;
  setOpenPopUpDetail: (value: boolean) => void;
}

export default function ModalNodeDetail({
  darkMode,
  showModalNodeDetail,
  data,
  setOpenPopUpDetail,
}: Props) {
  const getProperty = (key: string) => {
    const value = data?.properties?.[key];
    if (value == null) return undefined;
    return typeof value === "string" ? value : JSON.stringify(value, null, 2);
  };

  return (
    <AnimatePresence>
      {showModalNodeDetail ? (
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
              onClick={() => setOpenPopUpDetail(false)}
            />

            <div
              className={`relative z-10 w-full max-w-md rounded-xl p-6 shadow-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="flex justify-start gap-2">
                <SettingsIcon
                  size={16}
                  className="flex items-center justify-center"
                />
                <h4 className="text-base font-semibold mb-2">
                  {data?.title} ({data?.subtitle})
                </h4>
              </div>

              <p className="text-sm mb-4">
                <textarea
                  value={getProperty("sql")}
                  spellCheck={false}
                  className="
                    w-full
                    h-80
                    rounded-xl
                    border
                    p-4
                    font-mono
                    text-sm
                    resize-none
                    outline-none
                  "
                />
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpenPopUpDetail(false)}
                  className={`rounded-md px-4 py-2 text-xs ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Cancel
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
