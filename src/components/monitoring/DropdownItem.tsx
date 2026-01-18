import { Table2Icon, ToolCaseIcon } from "lucide-react";
import { Link } from "react-router-dom";

type ItemProps = {
  into: string;
  title: string;
  description: string;
  color: "blue" | "yellow" | "green" | "red";
  disabled: boolean;
  darkMode: boolean;
};

export default function DropdownItem({
  into,
  title,
  description,
  color,
  disabled,
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
      className={`
        flex items-center gap-3 rounded-xl px-3 py-2 transition
        ${disabled ? "cursor-not-allowed opacity-50 pointer-events-none" : "cursor-pointer"}
        ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${colorMap[color]}`}
      >
        {into === "/monitoring" ? <Table2Icon /> : <ToolCaseIcon />}
      </div>

      <Link
        to={into}
        className={`${
          darkMode
            ? "text-gray-200 after:bg-gray-400"
            : "text-gray-800 after:bg-gray-900"
        } flex flex-col`}
      >
        <span
          className={`font-small ${
            darkMode
              ? "text-gray-200 after:bg-gray-400"
              : "text-gray-800 after:bg-gray-900"
          }`}
        >
          {title}
        </span>
        <span className="text-sm text-gray-500">{description}</span>
      </Link>
    </div>
  );
}
