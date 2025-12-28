import { useOutletContext, useParams } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect } from "react";

export default function MonitoringDetail() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const { tableName } = useParams<{ tableName?: string }>();

  useEffect(() => {
    setTitle("Monitoring Detail");
  })
  
  return (
    <div className="grid grid-cols-1 flex-1 items-stretch">
        <h1
            className={darkMode ? "text-white" : "text-gray-900"}
        >
            There is detail table name {tableName}
        </h1>
    </div>
  )
}
