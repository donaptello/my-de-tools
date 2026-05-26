import { useNavigate, useOutletContext } from "react-router-dom";
import ExplorerCard from "../../components/hop-management-dir/DirectoryCard";
import { LayoutContextType } from "../../components/main/Layout";
import { Activity, FileCode2, HardDrive } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useHopDirectory,
  useHopReadFile,
} from "../../services/hooks/useHopDirectory";
import GraphNodeCard from "../../components/hop-management-dir/GraphNodeCard";

export default function HopManagementDir() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const { darkMode, setTitle, setDesc } = useOutletContext<LayoutContextType>();
  const { data: dataDirectory } = useHopDirectory();
  const { data: dataRead, setQuery } = useHopReadFile();

  useEffect(() => {
    setTitle("Hop Management Directory");
    setDesc("Apache Hop directory viewer");
  });
  return (
    <div className="flex flex-col px-10 md:px-40 flex-1 h-full">
      <div className="flex justify-start mb-6">
        <div className="inline-flex items-center rounded-2xl">
          {/* ACTIVE */}
          <button
            onClick={() => navigate("/hop-management")}
            className={`flex items-center gap-2 rounded-l-xl px-3 py-1.5 text-xs ${darkMode ? "text-gray-400 hover:text-gray-100 border-gray-700" : "text-gray-500 border-gray-200 hover:text-gray-800"} border-t border-l border-b transition-all cursor-pointer`}
          >
            <Activity className="h-3 w-3" />
            <span>Pipeline Dashboard</span>
          </button>

          {/* INACTIVE */}
          <button
            onClick={() => navigate("/hop-directory")}
            className={`flex items-center gap-2 rounded-r-xl ${darkMode ? "bg-blue-900/40 border-gray-700 text-blue-400" : "bg-blue-500 border-gray-200 text-white"} border-t border-r border-b px-3 py-1.5 text-xs transition-al cursor-pointer`}
          >
            <HardDrive className="h-3 w-3" />
            <span>File Directory</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 min-h-0">
        <div className="md:col-span-1 h-full min-h-0">
          <ExplorerCard
            darkMode={darkMode}
            selected={selected}
            setSelected={(value: string) => {
              setSelected(value);
              setQuery({ path: value });
            }}
            data={dataDirectory?.data}
          />
        </div>

        <div className="md:col-span-3">
          {selected && dataRead !== null ? (
            <GraphNodeCard darkMode={darkMode} dataRead={dataRead.data} />
          ) : (
            <div className={`h-full w-full rounded-xl flex flex-col items-center justify-center border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                <FileCode2 size={40} className="shrink-0 text-gray-400/60 mb-2" />
                <span className="text-gray-500/90 font-light text-sm">Select a <mark className="bg-gray-200 text-gray-500/90 px-2 rounded-md">.hpl</mark> file to view pipeline graph</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
