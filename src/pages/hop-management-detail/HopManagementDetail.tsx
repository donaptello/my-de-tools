import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect } from "react";

export default function HopManagementDetail() {
  const { darkMode, setTitle, setDesc } = useOutletContext<LayoutContextType>();

  useEffect(() => {
    setTitle("Hop Management Detail");
    setDesc("Pipeline {...}");
  });
  return (
    <div className="grid grid-cols-1 px-10 md:px-40 flex-1 items-stretch"></div>
  );
}
