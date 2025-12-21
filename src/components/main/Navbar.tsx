import { Link } from "react-router-dom";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

interface Props {
  title: string;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ title, darkMode, setDarkMode }: Props) {
  const [open, setOpen] = useState(false);

  function handleLinkClick() {
    setOpen(false);
  }
  return (
    <div className="relative min-h-12 mb-6">
      <div className="flex items-center justify-between">
        <h1
          className={`text-2xl font-bold max-w-[40%] truncate ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {title}
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg transition hover:scale-105 shrink-0 ${
              darkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>

          <button
            className="sm:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setOpen((v) => !v)}
            aria-controls="mobile-nav"
            aria-expanded={open}
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <nav className="absolute left-1/2 top-1/2 hidden sm:flex transform -translate-x-1/2 -translate-y-1/2 gap-6 text-lg">
        <Link
          to="/"
          hidden={true}
          className={`${darkMode ? "text-gray-200 after:bg-gray-400" : "text-gray-800 after:bg-gray-900"} relative inline-block cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
        >
          Home
        </Link>

        <Link
          to="/connection"
          className={`${darkMode ? "text-gray-200 after:bg-gray-400" : "text-gray-800 after:bg-gray-900"} relative inline-block cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
        >
          Connection
        </Link>

        <Link
          to="/tools"
          className={`${darkMode ? "text-gray-200 after:bg-gray-400" : "text-gray-800 after:bg-gray-900"} relative inline-block cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
          hidden={true}
        >
          Tools
        </Link>

        <Link
          to="/monitoring"
          className={`${darkMode ? "text-gray-200 after:bg-gray-400" : "text-gray-800 after:bg-gray-900"} relative inline-block cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
        >
          Monitoring
        </Link>
      </nav>

      <nav
        id="mobile-nav"
        className={`sm:hidden mt-2 overflow-hidden transition-all duration-200 ease-out flex flex-col gap-3 text-lg justify-center ${
          open
            ? "max-h-40 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!open}
        onClick={handleLinkClick}
      >
        <Link
          to="/"
          className={`${darkMode ? "text-gray-200" : "text-gray-800"} hover:font-bold`}
        >
          Home
        </Link>

        <Link
          to="/connection"
          className={`${darkMode ? "text-gray-200" : "text-gray-800"} hover:font-bold`}
        >
          Connection
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
    </div>
  );
}
