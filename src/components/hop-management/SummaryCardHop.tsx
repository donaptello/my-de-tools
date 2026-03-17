import { CheckCircle, XCircle, Activity } from "lucide-react";

type SummaryCardProps = {
  title: string;
  value: number | undefined;
  icon: React.ReactNode;
  bgIcon: string;
  darkMode: boolean;
  stats?: {
    success?: number;
    running?: number;
    error?: number;
  };
};

export default function SummaryCardHop({
  title,
  value,
  icon,
  bgIcon,
  darkMode,
  stats,
}: SummaryCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 shadow-sm transition hover:shadow-md ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={`h-12 w-12 flex items-center justify-center rounded-xl ${bgIcon}`}
        >
          {icon}
        </div>

        {/* Content */}
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {value}
          </h2>

          {/* Stats */}
          {stats && (
            <div className="flex items-center gap-3 mt-1 text-sm">
              {stats.success !== undefined && (
                <span className="flex items-center gap-1 text-green-500">
                  <CheckCircle size={14} />
                  {stats.success}
                </span>
              )}
              {stats.running !== undefined && (
                <span className="flex items-center gap-1 text-blue-500">
                  <Activity size={14} />
                  {stats.running}
                </span>
              )}
              {stats.error !== undefined && (
                <span className="flex items-center gap-1 text-red-500">
                  <XCircle size={14} />
                  {stats.error}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
