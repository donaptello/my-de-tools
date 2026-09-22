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
      {showModalNodeDetail && (
        <motion.div
          key="node-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setOpenPopUpDetail(false)}
          />

          <motion.div
            className={`relative z-10 w-full max-w-md rounded-xl p-6 shadow-lg ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex justify-start gap-2 items-center mb-2">
              <SettingsIcon size={16} className="text-blue-400" />
              <h4 className="text-base font-semibold">{data?.title}</h4>
            </div>

            <div className="flex justify-start gap-3 mb-2">
              <span className="text-xs font-normal text-gray-500">Type:</span>
              <span className="text-xs font-medium">{data?.subtitle}</span>
            </div>

            <table className="text-xs">
              <thead className="p-3 border border-gray-300 rounded-xl">
                <tr>
                  <th className="font-medium text-gray-400 uppercase">
                    Configuration
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>connection</td>
                  <td>{getProperty("connection")}</td>
                </tr>
                <tr>
                  <td>sql</td>
                  <td>{getProperty("sql")}</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
