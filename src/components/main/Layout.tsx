import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footers from "./Footers";
import { Outlet } from "react-router-dom";

export type LayoutContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

function Layout() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("dark-mode");
      if (saved !== null) return saved === "true";
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
    } catch (e) {
      /* ignore */
    }
    return false;
  });

  const [title, setTitle] = useState<string>(() => {
    return "Home";
  });

  useEffect(() => {
    try {
      localStorage.setItem("dark-mode", darkMode ? "true" : "false");
    } catch (e) {
      /*ignore*/
    }

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
        <Navbar title={title} darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="grid grid-cols-1 flex-1 items-stretch">
          <main className="h-full min-h-0">
            <Outlet context={{ darkMode, setDarkMode, title, setTitle }} />
          </main>
        </div>
        <Footers darkMode={darkMode} />
      </div>
    </div>
  );
}

export default Layout;
