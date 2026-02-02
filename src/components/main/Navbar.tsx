import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogIn, Moon, Sun } from "lucide-react";
import DropdownItem from "../monitoring/DropdownItem";

interface Props {
  title: string;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ title, darkMode, setDarkMode }: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLinkClick() {
    setOpen(false);
  }

  function handleLoginClick() {
    navigate("/login");
  }
  return (
    <div className="relative min-h-12 mb-6">
      <div className="flex items-center justify-between">
        <h1
          className={`text-2xl font-medium max-w-[40%] truncate ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {title}
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLoginClick}
            className={`px-2 py-2 rounded-lg transition hover:scale-105 shrink-0 ${
              darkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
            }`}
            aria-label="Toggle theme"
          >
            <LogIn className="p-1"/>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-2 py-2 rounded-lg transition hover:scale-105 shrink-0 ${
              darkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="p-1" /> : <Moon className="p-1" />}
          </button>

          <button
            className="sm:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setOpen((v) => !v)}
            aria-controls="mobile-nav"
            aria-expanded={open}
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <nav className="absolute left-1/2 top-1/2 hidden sm:flex transform -translate-x-1/2 -translate-y-1/2 gap-6 text-lg">
        <Link
          to="/"
          className={`${
            darkMode
              ? "text-gray-200 after:bg-gray-400"
              : "text-gray-800 after:bg-gray-900"
          } relative inline-block cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
        >
          Home
        </Link>

        <Link
          to="/connection"
          className={`${
            darkMode
              ? "text-gray-200 after:bg-gray-400"
              : "text-gray-800 after:bg-gray-900"
          } relative inline-block cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
        >
          Connection
        </Link>

        <Link
          to="/tools"
          className={`${
            darkMode
              ? "text-gray-200 after:bg-gray-400"
              : "text-gray-800 after:bg-gray-900"
          } relative inline-block cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
          hidden={true}
        >
          Tools
        </Link>

        <div className="relative group inline-block">
          {/* Trigger */}
          <div
            className={`
            relative inline-flex items-center gap-1 cursor-pointer
            ${darkMode ? "text-gray-200 after:bg-gray-400" : "text-gray-800 after:bg-gray-900"}
            after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full
            after:origin-left after:scale-x-0
            after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100
          `}
          >
            Monitoring
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Dropdown */}
          <div
            className={`
            absolute left-1/2 top-full z-50 mt-1 w-80
            -translate-x-1/2
            opacity-0 translate-y-2
            pointer-events-none
            transition-all duration-200 ease-out
            group-hover:opacity-100 
            group-hover:translate-y-0
            group-hover:pointer-events-auto
          `}
          >
            <div
              className={`rounded-2xl border shadow-xl p-3 space-y-1 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Item */}
              <DropdownItem
                into="/monitoring"
                title="Monitoring Table"
                description="View all tables"
                color="blue"
                disabled={false}
                darkMode={darkMode}
              />

              <DropdownItem
                into="/monitoring-configuration"
                title="Rowcount Configuration"
                description="Configuration Monitoring Table"
                color="blue"
                disabled={false}
                darkMode={darkMode}
              />

              <DropdownItem
                into="#"
                title="Monitoring Table Detail"
                description="Table Detail"
                color="yellow"
                disabled={true}
                darkMode={darkMode}
              />

              <DropdownItem
                into="#"
                title="Monitoring Hop"
                description="Pending items"
                color="yellow"
                disabled={true}
                darkMode={darkMode}
              />

            </div>
          </div>
        </div>
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
          className={`${
            darkMode ? "text-gray-200" : "text-gray-800"
          } hover:font-bold`}
        >
          Home
        </Link>

        <Link
          to="/connection"
          className={`${
            darkMode ? "text-gray-200" : "text-gray-800"
          } hover:font-bold`}
        >
          Connection
        </Link>

        <Link
          to="/tools"
          className={`${
            darkMode ? "text-gray-200" : "text-gray-800"
          } hover:font-bold`}
        >
          Tools
        </Link>

        <Link
          to="/monitoring"
          className={`${
            darkMode ? "text-gray-200" : "text-gray-800"
          } hover:font-bold`}
        >
          Monitoring
        </Link>
      </nav>
    </div>
  );
}
