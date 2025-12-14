import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect } from "react";
import { monitoringTotalDataMock } from "../../services/mocks/Monitoring.mock";
import StatCard from "../../components/monitoring/StatCard";

export default function Monitoring() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const { data } = monitoringTotalDataMock;

  useEffect(() => {
    setTitle("Monitoring");
  }, [setTitle]);

  return (
    <div className="grid grid-cols-1 flex-1 items-stretch">
      <div className="grid grid-cols-1 px-20 md:grid-cols-4 gap-6 items-stretch">

        <StatCard 
          title="Total Table"
          value={data.totalTable}
          darkMode={darkMode}
          description="Total table has replicated"
        />

        <StatCard 
          title="In Completed"
          value={data.inCompleted}
          darkMode={darkMode}
          description="Total table in completed process etl"
        />

        <StatCard 
          title="Completed"
          value={data.completed}
          darkMode={darkMode}
          description="Total table completed process"
        />

        <StatCard 
          title="To be Checked"
          value={data.toBeChecked}
          darkMode={darkMode}
          description="Total table need to checked process"
        />

      </div>

      <p className={`mt-5 ${darkMode ? "text-white" : "text-gray-800"}`}>
        Todo: make a search and table
      </p>
    </div>
  );
}
