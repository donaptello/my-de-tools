import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect } from "react";

export default function HopManagement() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();

  useEffect(() => {
    setTitle("Hop Management");
  });
  return (
    <div className="grid grid-cols-1 px-10 md:px-40 flex-1 items-stretch"></div>
  );
}
