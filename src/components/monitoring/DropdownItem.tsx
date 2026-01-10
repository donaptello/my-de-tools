import { Link } from "react-router-dom";

type ItemProps = {
  title: string;
  description: string;
  color: "blue" | "yellow" | "green" | "red";
  darkMode: boolean;
};

export default function DropdownItem({
  title,
  description,
  color,
  darkMode,
}: ItemProps) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-100",
    yellow: "text-yellow-600 bg-yellow-100",
    green: "text-green-600 bg-green-100",
    red: "text-red-600 bg-red-100",
  };

  return (
    <div
      className="
        flex items-center gap-3 rounded-xl px-3 py-2
        cursor-pointer transition
        hover:bg-gray-100
      "
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${colorMap[color]}`}
      >
        ●
      </div>

      <Link
        to="/monitoring"
        className={`${
          darkMode
            ? "text-gray-200 after:bg-gray-400"
            : "text-gray-800 after:bg-gray-900"
        } flex flex-col`}
      >
        <span className="font-medium text-gray-900">{title}</span>
        <span className="text-sm text-gray-500">{description}</span>
      </Link>
    </div>
  );
}
