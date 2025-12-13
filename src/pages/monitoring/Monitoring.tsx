import { useEffect, useState } from "react";
import Footers from "../../components/main/Footers";
import Navbar from "../../components/main/Navbar";

export default function Monitoring() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("dark-mode");
      if (saved !== null) return saved === "true";
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      /* ignore */
    }
    return false;
  });

  useEffect(() => {
      try {
        localStorage.setItem("dark-mode", darkMode ? "true" : "false");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {/*ignore*/}
  
      if (darkMode) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }, [darkMode]);

  return (
    <div>
      <div
        className={`p-6 min-h-screen flex flex-col transition-colors ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <Navbar
          title="Monitoring"
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <div className="grid grid-cols-1 flex-1 items-stretch">
          <p
            className={`${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Todo: make a monitoring
          </p>
        </div>

        <Footers darkMode={darkMode} />
      </div>
    </div>
  );
}
