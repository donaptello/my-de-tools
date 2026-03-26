import { HopOrchestration } from "../../services/types/HopManagement.types";
import { Activity, AlertTriangle, Box, Clock, GitBranch } from "lucide-react";
import Skeleton from "../main/Skleton";
import { useNavigate } from "react-router-dom";

type TableHopProps = {
  darkMode: boolean;
  data: HopOrchestration[] | undefined;
  title: string;
  icon: React.ReactNode;
  loading: boolean;
};

export default function TableHop({
  darkMode,
  data,
  title,
  icon,
  loading,
}: TableHopProps) {
  const navigate = useNavigate();
  const getBgStatus = (status: string) => {
    switch (status) {
      case "Stopped":
        return "bg-yellow-100 text-yellow-600";
      case "Finished":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-red-100 text-red-600";
    }
  };

  return (
    <div
      className={`flex-1 rounded-xl border shadow-sm ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="font-semibold text-lg">{title}</h2>

          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {data?.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
            <AlertTriangle size={16} />
            Clear Log
          </button>
        </div>
      </div>

      {/* TABLE FULL WIDTH */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* HEADER */}
          <thead
            className={`text-left border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <tr className="text-gray-500">
              <th className="px-6 py-3">Name</th>
              <th className="px-6">Type</th>
              <th className="px-6">Status</th>
              <th className="px-6">Duration</th>
              <th className="px-6">Start Date</th>
              <th className="px-6">End Date</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data?.length != 0 && loading === false ? (
              data?.map((item, i) => (
                <tr
                  key={i}
                  onClick={() => navigate(`/hop-management/${item.id}?pipelineName=${item.name}`)}
                  className={`border-t ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  } transition hover:cursor-pointer`}
                >
                  <td className="px-6 py-4 font-medium">{item.name}</td>

                  <td className="px-6">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 w-fit">
                      {item.type === "Pipeline" ? (
                        <Activity size={14} />
                      ) : (
                        <GitBranch size={14} />
                      )}
                      {item.type}
                    </span>
                  </td>

                  <td className="px-6">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${getBgStatus(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {item.duration}
                    </div>
                  </td>

                  <td className="px-6 text-gray-500">{item.startDate}</td>
                  <td className="px-6 text-gray-500">{item.endDate}</td>
                </tr>
              ))
            ) : data?.length != 0 && loading === true ? (
              Array.from({ length: 10 }).map((_, index) => (
                <tr
                  key={index}
                  className={`border-t ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  } transition`}
                >
                  <td className="px-6 py-4 font-medium">
                    <Skeleton />
                  </td>

                  <td className="px-6">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 w-fit">
                      <Skeleton />
                    </span>
                  </td>

                  <td className="px-6">
                    <span
                      className={`px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600`}
                    >
                      <Skeleton />
                    </span>
                  </td>

                  <td className="px-6 text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                    </div>
                  </td>

                  <td className="px-6 text-gray-500">
                    <Skeleton />
                  </td>
                  <td className="px-6 text-gray-500">
                    <Skeleton />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  <div className="flex justify-center items-center gap-2">
                    <Box size={14} color="#999" />
                    <span className="text-gray-500">No data found.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
