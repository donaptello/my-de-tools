import ReactECharts from "echarts-for-react";
import Skeleton from "../main/Skleton";
import { MonitoringTableDetail } from "../../services/types/Monitoring.types";

type SourceTargetChartCardProps = {
  title: string | undefined;
  data: MonitoringTableDetail[];
  loading: boolean;
  darkMode: boolean;
  description?: string;
};

export default function SourceTargetChartCard({
  title,
  data,
  loading,
  darkMode,
  description,
}: SourceTargetChartCardProps) {
  if (loading) {
    return (
      <div
        className={`rounded-xl border p-4 shadow-sm ${
          darkMode ? "bg-gray-800" : "border-gray-200 bg-white"
        }`}
      >
        <Skeleton />
      </div>
    );
  }

  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const dates = sorted.map((d) => d.date);
  const sourceTotals = sorted.map((d) => d.totalInSource);
  const targetTotals = sorted.map((d) => d.totalInTarget ?? 0);
  const diffs = sorted.map((d) => d.diff);

  const mismatchIndexes = diffs
    .map((d, i) => (d !== 0 ? i : null))
    .filter((i) => i !== null) as number[];

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any[]) => {
        const i = params[0].dataIndex;
        return `
          <b>${dates[i]}</b><br/>
          Source Total: ${sourceTotals[i]}<br/>
          Target Total: ${sorted[i].totalInTarget ?? "NULL"}<br/>
          <b style="color:${diffs[i] === 0 ? "#22c55e" : "#ef4444"}">
            Diff: ${diffs[i]}
          </b>
        `;
      },
    },
    legend: {
      top: 10,
      textStyle: {
        color: darkMode ? "#e5e7eb" : "#374151",
      },
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: "6%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: dates,
      axisLabel: {
        color: darkMode ? "#9ca3af" : "#6b7280",
      },
    },
    yAxis: [
      {
        type: "value",
        name: "Total",
        axisLabel: {
          color: darkMode ? "#9ca3af" : "#6b7280",
        },
      },
      {
        type: "value",
        name: "Diff",
        axisLabel: {
          color: darkMode ? "#9ca3af" : "#6b7280",
        },
      },
    ],
    series: [
      {
        name: "Source Total",
        type: "line",
        smooth: true,
        data: sourceTotals,
      },
      {
        name: "Target Total",
        type: "line",
        smooth: true,
        lineStyle: { width: 3 },
        data: targetTotals,
      },
      {
        name: "Diff",
        type: "bar",
        yAxisIndex: 1,
        data: diffs,
        itemStyle: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          color: (params: any) => (params.value === 0 ? "#22c55e" : "#ef4444"),
        },
        markPoint: {
          data: mismatchIndexes.map((i) => ({
            coord: [dates[i], diffs[i]],
            value: "!",
          })),
        },
      },
    ],
  };

  return (
    <div
      className={`rounded-xl border p-4 shadow-sm transition hover:shadow-2xl hover:-translate-y-1 ${
        darkMode ? "bg-gray-800" : "border-gray-200 bg-white"
      }`}
    >
      {/* Header */}
      <div className="mb-2">
        <h3
          className={`text-sm font-medium ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {title}
        </h3>
        {description && <p className="text-xs text-gray-400">{description}</p>}
      </div>

      {/* Chart */}
      <ReactECharts option={option} style={{ height: 360, width: "100%" }} />
    </div>
  );
}
