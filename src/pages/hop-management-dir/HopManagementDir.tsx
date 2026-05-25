import { useNavigate, useOutletContext } from "react-router-dom";
import ExplorerCard from "../../components/hop-management-dir/DirectoryCard";
import { LayoutContextType } from "../../components/main/Layout";
import { Activity, HardDrive } from "lucide-react";

export default function HopManagementDir() {
  const navigate = useNavigate();
  const { darkMode, setTitle, setDesc } = useOutletContext<LayoutContextType>();
  setTitle("Hop Management Directory");
  setDesc("Apache Hop Directory Viewer");

  return (
    <div className="grid grid-cols-1 px-10 md:px-40 flex-1 items-stretch">
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

      <div>
        <ExplorerCard />
      </div>
    </div>
  );
}
