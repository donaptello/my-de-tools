import SvgIcons from "./SvgIcons";

type StatCardProps = {
  title: string;
  value: number | undefined;
  darkMode: boolean;
  description: string;
};

export default function StatCard({
  title,
  value,
  darkMode,
  description,
}: StatCardProps) {
  const bgColor: string =
    title === "Completed"
      ? "bg-green-100"
      : title === "In Completed"
      ? "bg-yellow-100"
      : title === "Total Table"
      ? "bg-blue-100"
      : title === "To be Checked"
      ? "bg-red-100"
      : "bg-green-100";

  return (
    <div
      className={`rounded-xl border  p-4 shadow-sm transition hover:shadow-2xl hover:-translate-y-1 ${
        darkMode ? "bg-gray-800" : "border-gray-200 bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${bgColor}`}
        >
          <SvgIcons title={title} />
        </div>
      </div>

      {/* Value */}
      <div className="mt-2">
        <h2
          className={`text-2xl font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {value ?? 0}
        </h2>
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-center text-sm">
        <span className="text-gray-400">{description}</span>
      </div>
    </div>
  );
}
