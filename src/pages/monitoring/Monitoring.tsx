import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect } from "react";
import StatCard from "../../components/monitoring/StatCard";
import SearchTableCard from "../../components/monitoring/SearchTableBar";
import {
  useMonitoringData,
  useMonitoringTable,
} from "../../services/hooks/useMonitoring";

export default function Monitoring() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const { data: totalData, loading: loadingTotalData } = useMonitoringData();
  const {
    data: tableData,
    loading: loadingTableData,
    setQuery: setQueryTableData,
  } = useMonitoringTable();
  useEffect(() => {
    setTitle("Monitoring");
  }, [setTitle]);

  return (
    <div className="grid grid-cols-1 flex-1 items-stretch">
      <div className="grid grid-cols-1 px-6 md:px-20 md:grid-cols-4 gap-6 items-stretch">
        <StatCard
          title="Total Table"
          value={totalData?.data.totalTable}
          loading={loadingTotalData}
          darkMode={darkMode}
          description="Total table has replicated"
        />

        <StatCard
          title="In Completed"
          value={totalData?.data.inCompleted}
          loading={loadingTotalData}
          darkMode={darkMode}
          description="Total table in completed process etl"
        />

        <StatCard
          title="Completed"
          value={totalData?.data.completed}
          loading={loadingTotalData}
          darkMode={darkMode}
          description="Total table completed process"
        />

        <StatCard
          title="To be Checked"
          value={totalData?.data.toBeChecked}
          loading={loadingTotalData}
          darkMode={darkMode}
          description="Total table need to checked process"
        />
      </div>

      <div className="w-full px-6 md:px-20 md:pt-6 md:pb-6">
        <SearchTableCard
          darkMode={darkMode}
          tableData={tableData?.data}
          loading={loadingTableData}
          setQueryTableData={(value: string) => setQueryTableData({ table: value })}
        />
      </div>
    </div>
  );
}
