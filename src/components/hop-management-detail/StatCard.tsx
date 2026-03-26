type StatCardProps = {
  darkMode: boolean;
  statName: string;
  statValue: number;
}

export default function StatCard({ darkMode, statName, statValue }: StatCardProps) {
  const formatter = new Intl.NumberFormat("de-DE");
  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="items-center text-center space-y-1">
        <p className="text-xs text-gray-500">{statName}</p>
        <span className="font-semibold text-xl">
          {formatter.format(statValue)}
        </span>
      </div>
    </div>
  );
}
