import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect } from "react";
import { monitoringTableDataMock, monitoringTotalDataMock } from "../../services/mocks/Monitoring.mock";
import StatCard from "../../components/monitoring/StatCard";
import SearchBar from "../../components/monitoring/SearchTableBar";

export default function Monitoring() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const { data: totalData } = monitoringTotalDataMock;
  const { data: tableData } = monitoringTableDataMock;

  useEffect(() => {
    setTitle("Monitoring");
  }, [setTitle]);

  return (
    <div className="grid grid-cols-1 flex-1 items-stretch">
      <div className="grid grid-cols-1 px-6 md:px-20 md:grid-cols-4 gap-6 items-stretch">

        <StatCard 
          title="Total Table"
          value={totalData.totalTable}
          darkMode={darkMode}
          description="Total table has replicated"
        />

        <StatCard 
          title="In Completed"
          value={totalData.inCompleted}
          darkMode={darkMode}
          description="Total table in completed process etl"
        />

        <StatCard 
          title="Completed"
          value={totalData.completed}
          darkMode={darkMode}
          description="Total table completed process"
        />

        <StatCard 
          title="To be Checked"
          value={totalData.toBeChecked}
          darkMode={darkMode}
          description="Total table need to checked process"
        />
      </div>
      
      <div className="w-full px-6 md:px-20 md:pt-6 md:pb-6">
        <SearchBar darkMode={darkMode} tableData={tableData} />
      </div>
    </div>
  );
}
