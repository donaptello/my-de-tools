type StatHomeProps = {
  darkMode: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

export default function CardHome({
  darkMode,
  title,
  description,
  icon,
  disabled,
}: StatHomeProps) {
  return (
    <div
      className={`rounded-xl border p-6 transition ${
        disabled ? "cursor-not-allowed opacity-70" : "hover:border-blue-300"
      } ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-lg ${darkMode ? "bg-blue-900/40" : "bg-gray-100"} flex items-center justify-center`}>
          {icon}
        </div>
        {disabled ? (
          <span className="inline-flex px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500 bg-gray-100 rounded-full">
            Coming Soon
          </span>
        ) : null}
      </div>
      <h3 className={`font-medium ${darkMode? "text-gray-100": "text-gray-800"} mb-1`}>{title}</h3>
      <p className={`text-sm font-light ${darkMode? "text-gray-300": "text-gray-500"}`}>{description}</p>
    </div>
  );
}
