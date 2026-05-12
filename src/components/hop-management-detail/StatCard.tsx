type StatCardProps = {
  darkMode: boolean;
  statName: string;
  statValue: number | undefined;
};

export default function StatCard({
  darkMode,
  statName,
  statValue,
}: StatCardProps) {
  const formatter = new Intl.NumberFormat("de-DE");
  const redBorderError = () => {
    if (
      statName === "Total Errors" &&
      statValue !== undefined &&
      statValue > 0
    ) {
      if (darkMode) {
        return "border-red-700";
      }
      return "border-red-400";
    }
    if (darkMode) {
      return "border-gray-700";
    }
    return "border-gray-200";
  };
  const textRed = () => {
    if (
      statName === "Total Errors" &&
      statValue !== undefined &&
      statValue > 0
    ) {
      if (darkMode) {
        return "text-red-700";
      }
      return "text-red-400";
    }
    if (darkMode) {
      return "text-gray-200";
    }
    return "";
  };
  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${
        darkMode ? "bg-gray-800" : "bg-white"
      } ${redBorderError()}`}
    >
      <div className="items-center text-center space-y-1">
        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{statName}</p>
        <span className={`font-semibold text-xl ${textRed()}`}>
          {statValue !== undefined ? formatter.format(statValue) : 0}
        </span>
      </div>
    </div>
  );
}
