import { Link } from "react-router-dom";

interface Props {
  title: string;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ title, darkMode, setDarkMode }: Props) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1
        className={`text-2xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {title}
      </h1>

      <nav className="flex gap-6 text-lg">
        <Link
          to="/"
          className={`${darkMode ? "text-gray-200" : "text-gray-800"} hover:font-bold`}
        >
          Home
        </Link>

        <Link
          to="/tools"
          className={`${darkMode ? "text-gray-200" : "text-gray-800"} hover:font-bold`}
        >
          Tools
        </Link>

        <Link
          to="/monitoring"
          className={`${darkMode ? "text-gray-200" : "text-gray-800"} hover:font-bold`}
        >
          Monitoring
        </Link>
      </nav>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`px-4 py-2 rounded-lg transition hover:scale-105 ${
          darkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
        }`}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
