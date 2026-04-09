import { useState } from "react";
import { HopOrchestration } from "../../services/types/HopManagement.types";
import {
  Activity,
  AlertTriangle,
  Box,
  Clock,
  GitBranch,
  Play,
  Square,
  Trash,
} from "lucide-react";
import Skeleton from "../main/Skleton";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/time";

type TableHopProps = {
  darkMode: boolean;
  mode: string;
  data: HopOrchestration[] | undefined;
  title: string;
  icon: React.ReactNode;
  loading: boolean;
  onSearch: (
    searchName: string,
    size: number,
    status: string,
    order: string,
    orderBy: string,
  ) => void;
  setShowDeleteConfirm: (mode: string, value: boolean) => void;
};

export default function TableHop({
  darkMode,
  mode,
  data,
  title,
  icon,
  loading,
  onSearch,
  setShowDeleteConfirm,
}: TableHopProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("All");
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("startDate");

  const getBgStatus = (status: string) => {
    switch (status) {
      case "Running":
        return "bg-blue-100 text-blue-600";
      case "Finished":
        return "bg-green-100 text-green-600";
      case "Halting":
        return "bg-red-100 text-red-800";
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

        <div className="flex items-center gap-3">
          {/* Dropdown size */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              onSearch(search, Number(e.target.value), status, order, orderBy);
            }}
            className={`${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-200"
            } border rounded-lg px-2 py-2 text-xs`}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          {/* Dropdown Status */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              onSearch(search, pageSize, e.target.value, order, orderBy);
            }}
            className={`${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-200"
            } border rounded-lg px-2 py-2 text-xs`}
          >
            <option value="All">All</option>
            <option value="Finished">Finished</option>
            <option value="Finished (with errors)">
              Finished (with errors)
            </option>
            <option value="Running">Running</option>
            <option value="Halting">Halting</option>
          </select>

          {/* Dropdown OrderBy */}
          <select
            value={orderBy}
            onChange={(e) => {
              setOrderBy(e.target.value);
              onSearch(search, pageSize, status, order, e.target.value);
            }}
            className={`${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-200"
            } border rounded-lg px-2 py-2 text-xs`}
          >
            <option value="startDate">Start Date</option>
            <option value="durationRaw">Duration</option>
          </select>

          {/* Dropdown Order asc/desc */}
          <select
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
              onSearch(search, pageSize, status, e.target.value, orderBy);
            }}
            className={`${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-200"
            } border rounded-lg px-2 py-2 text-xs`}
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>

          {/* Search Name */}
          <div
            className={`${darkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <input
              type="text"
              placeholder={`Search ${mode}...`}
              value={search}
              onChange={(e) => {
                const v = e.target.value;
                setSearch(v);
                onSearch(v, pageSize, status, order, orderBy);
              }}
              className={`flex-1 rounded-lg px-4 py-2 text-xs placeholder-gray-400 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "text-gray-200 bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring-blue-900"
                  : "text-gray-700 bg-white border border-gray-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
          </div>
          {/* Button Clear Log */}
          <button
            onClick={() => setShowDeleteConfirm(mode, true)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs"
          >
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
              <th className="px-6 font-medium py-3">Name</th>
              <th className="px-6 font-medium">Type</th>
              <th className="px-6 font-medium">Status</th>
              <th className="px-6 font-medium">Duration</th>
              <th className="px-6 font-medium">Start Date</th>
              <th className="px-6 font-medium">End Date</th>
              <th className="px-6 font-medium">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data?.length != 0 && loading === false ? (
              data?.map((item, i) => (
                <tr
                  key={i}
                  onClick={() =>
                    navigate(
                      `/hop-management/${item.id}?pipelineName=${item.name}`,
                    )
                  }
                  className={`border-t ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  } transition hover:cursor-pointer`}
                >
                  <td className="px-6 py-4 truncate max-w-52 font-medium">
                    {item.name}
                  </td>

                  <td className="px-6">
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-white border border-gray-200 text-gray-700 w-fit">
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

                  <td className="px-6 text-gray-500">
                    {formatDate(item.startDate)}
                  </td>
                  <td className="px-6 text-gray-500">
                    {formatDate(item.endDate || new Date().toISOString())}
                  </td>
                  <td className="px-6">
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // onPlay(item);
                        }}
                        disabled={item.status === "Running"}
                        className="text-green-600 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors p-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Play size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // onStop(item);
                        }}
                        disabled={item.status !== "Running"}
                        className="text-orange-600 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors p-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Square size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // onDelete(item);
                        }}
                        disabled={item.status === "Running"}
                        className="text-red-600 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors p-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
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
                  <td>
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
