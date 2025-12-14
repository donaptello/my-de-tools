import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";

export default function Monitoring() {
  const { darkMode } = useOutletContext<LayoutContextType>();
  return (
    <div className="grid grid-cols-1 flex-1 items-stretch">
      <p className={`${darkMode ? "text-white" : "text-gray-800"}`}>
        Todo: make a monitoring
      </p>
    </div>
  );
}
