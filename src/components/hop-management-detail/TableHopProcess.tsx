import { Box, Hash } from "lucide-react";
import Skeleton from "../main/Skleton";
import { HopPipelineDetail } from "../../services/types/HopManagement.types";

type TableHopProcessProps = {
  darkMode: boolean;
  loading: boolean;
};

export default function TableHopProcess({
  darkMode,
  loading,
}: TableHopProcessProps) {
  const transformDetail: HopPipelineDetail[] = [
    {
      transformName: "Add a checksum",
      copy: 0,
      linesRead: 570883,
      linesWritten: 570883,
      linesInput: 0,
      linesOutput: 0,
      linesUpdated: 0,
      linesRejected: 0,
      inputBufferSize: 0,
      outputBufferSize: 0,
      errors: 0,
      statusDescription: "Finished",
      seconds: 1473.4,
      speed: " 387",
      priority: "-",
      stopped: false,
      paused: false,
      logText:
        "2026/02/26 06:24:51 - Add a checksum.0 - Finished processing (I=0, O=0, R=570883, W=570883, U=0, E=0)\n",
      sampleRowMeta: null,
      sampleRows: null,
    },
    {
      transformName: "User defined Java expression",
      copy: 0,
      linesRead: 570883,
      linesWritten: 570883,
      linesInput: 0,
      linesOutput: 0,
      linesUpdated: 0,
      linesRejected: 0,
      inputBufferSize: 0,
      outputBufferSize: 0,
      errors: 0,
      statusDescription: "Finished",
      seconds: 1485.4,
      speed: " 384",
      priority: "-",
      stopped: false,
      paused: false,
      logText:
        "2026/02/26 06:25:03 - User defined Java expression.0 - Finished processing (I=0, O=0, R=570883, W=570883, U=0, E=0)\n",
      sampleRowMeta: null,
      sampleRows: null,
    },
    {
      transformName: "Select values",
      copy: 0,
      linesRead: 570883,
      linesWritten: 570883,
      linesInput: 0,
      linesOutput: 0,
      linesUpdated: 0,
      linesRejected: 0,
      inputBufferSize: 0,
      outputBufferSize: 0,
      errors: 0,
      statusDescription: "Finished",
      seconds: 1449.1,
      speed: " 394",
      priority: "-",
      stopped: false,
      paused: false,
      logText:
        "2026/02/26 06:24:27 - Select values.0 - Finished processing (I=0, O=0, R=570883, W=570883, U=0, E=0)\n",
      sampleRowMeta: null,
      sampleRows: null,
    },
    {
      transformName: "String operations",
      copy: 0,
      linesRead: 570883,
      linesWritten: 570883,
      linesInput: 0,
      linesOutput: 0,
      linesUpdated: 0,
      linesRejected: 0,
      inputBufferSize: 0,
      outputBufferSize: 0,
      errors: 0,
      statusDescription: "Finished",
      seconds: 1461.4,
      speed: " 391",
      priority: "-",
      stopped: false,
      paused: false,
      logText:
        "2026/02/26 06:24:39 - String operations.0 - Finished processing (I=0, O=0, R=570883, W=570883, U=0, E=0)\n",
      sampleRowMeta: null,
      sampleRows: null,
    },
    {
      transformName: "Select values 2",
      copy: 0,
      linesRead: 570883,
      linesWritten: 570883,
      linesInput: 0,
      linesOutput: 0,
      linesUpdated: 0,
      linesRejected: 0,
      inputBufferSize: 0,
      outputBufferSize: 0,
      errors: 0,
      statusDescription: "Finished",
      seconds: 1497.6,
      speed: " 381",
      priority: "-",
      stopped: false,
      paused: false,
      logText:
        "2026/02/26 06:25:15 - Select values 2.0 - Finished processing (I=0, O=0, R=570883, W=570883, U=0, E=0)\n",
      sampleRowMeta: null,
      sampleRows: null,
    },
    {
      transformName: "Insert / update",
      copy: 0,
      linesRead: 570883,
      linesWritten: 570883,
      linesInput: 570883,
      linesOutput: 9091,
      linesUpdated: 561792,
      linesRejected: 0,
      inputBufferSize: 0,
      outputBufferSize: 0,
      errors: 0,
      statusDescription: "Finished",
      seconds: 1508.9,
      speed: " 378",
      priority: "-",
      stopped: false,
      paused: false,
      logText:
        "2026/02/26 06:25:27 - Insert / update.0 - Finished processing (I=570883, O=9091, R=570883, W=570883, U=561792, E=0)\n",
      sampleRowMeta: null,
      sampleRows: null,
    },
    {
      transformName: "bc30_header_raung",
      copy: 0,
      linesRead: 0,
      linesWritten: 570883,
      linesInput: 570883,
      linesOutput: 0,
      linesUpdated: 0,
      linesRejected: 0,
      inputBufferSize: 0,
      outputBufferSize: 0,
      errors: 0,
      statusDescription: "Finished",
      seconds: 1437,
      speed: " 397",
      priority: "-",
      stopped: false,
      paused: false,
      logText:
        "2026/02/26 06:24:15 - bc30_header_raung.0 - Finished reading query, closing connection.\n2026/02/26 06:24:15 - bc30_header_raung.0 - Finished processing (I=570883, O=0, R=0, W=570883, U=0, E=0)\n",
      sampleRowMeta: null,
      sampleRows: null,
    },
  ];
  const formatter = new Intl.NumberFormat("de-DE");
  return (
    <div
      className={`flex-1 rounded-xl border shadow-sm ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Hash size={16} className="text-gray-500" />
          <h2 className="font-medium text-base">Transform Detail</h2>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-xs text-gray-400">Updated: 21.09.50</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* HEADER */}
          <thead
            className={`text-left border-y ${
              darkMode ? "border-gray-700" : "border-gray-200 bg-gray-50"
            }`}
          >
            <tr className="text-gray-500 text-xs">
              <th className="px-6 py-3 font-medium text-blue-500">
                Transform Name
              </th>
              <th className="px-6 font-medium">CopyNr</th>
              <th className="px-6 font-medium">Read</th>
              <th className="px-6 font-medium">Written</th>
              <th className="px-6 font-medium">Input</th>
              <th className="px-6 font-medium">Output</th>
              <th className="px-6 font-medium">Updated</th>
              <th className="px-6 font-medium">Rejected</th>
              <th className="px-6 font-medium">Errors</th>
              <th className="px-6 font-medium">Status</th>
              <th className="px-6 font-medium">Time</th>
              <th className="px-6 font-medium">Speed</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {transformDetail?.length != 0 && loading === false ? (
              transformDetail?.map((item, i) => (
                <tr
                  key={i}
                  className={`border-t ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  } transition hover:cursor-pointer`}
                >
                  <td className="px-6 py-4 font-medium">
                    {item.transformName}
                  </td>
                  <td className="px-6 text-gray-500">{formatter.format(item.copy)}</td>
                  <td className="px-6 text-gray-500">{formatter.format(item.linesRead)}</td>
                  <td className="px-6 text-gray-500">{formatter.format(item.linesWritten)}</td>
                  <td className="px-6 text-gray-500">{formatter.format(item.linesInput)}</td>
                  <td className="px-6 text-gray-500">{formatter.format(item.linesOutput)}</td>
                  <td className="px-6 text-gray-500">{formatter.format(item.linesUpdated)}</td>
                  <td className="px-6 text-gray-500">{formatter.format(item.linesRejected)}</td>
                  <td className="px-6 text-gray-500">{formatter.format(item.errors)}</td>
                  <td className="px-6 text-gray-500">
                    {item.statusDescription}
                  </td>
                  <td className="px-6 text-gray-500">{formatter.format(item.seconds)}s</td>
                  <td className="px-6 text-gray-500">{item.speed}</td>
                </tr>
              ))
            ) : transformDetail?.length != 0 && loading === true ? (
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
                    <Skeleton />
                  </td>
                  <td className="px-6 text-gray-500">
                    <Skeleton />
                  </td>
                  <td className="px-6 text-gray-500">
                    <Skeleton />
                  </td>
                  <td className="px-6 text-gray-500">
                    <Skeleton />
                  </td>
                  <td className="px-6 text-gray-500">
                    <Skeleton />
                  </td>
                  <td className="px-6 text-gray-500">
                    <Skeleton />
                  </td>
                  <td className="px-6 text-gray-500">
                    <Skeleton />
                  </td>
                  <td className="px-6 text-gray-500">
                    <Skeleton />
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
                    <span className="text-gray-500">
                      No transformDetail found.
                    </span>
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
