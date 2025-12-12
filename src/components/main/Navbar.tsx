interface Props {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ darkMode, setDarkMode }: Props) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1
        className={`text-2xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Table Tools
      </h1>

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
