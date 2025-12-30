import { useOutletContext, useParams } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect } from "react";
import {
  useMonitoringFetchTable,
  useMonitoringTable,
} from "../../services/hooks/useMonitoring";
import StatCard from "../../components/monitoring/StatCard";
import SourceTargetChartCard from "../../components/monitoring/WidgetChartBar";
import SearchTableDetailCard from "../../components/monitoring/SearchTableBarDetail";

export default function MonitoringDetail() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const { tableName } = useParams<{ tableName?: string }>();
  const { data, loading } = useMonitoringFetchTable(tableName);
  const { data: dataDetail, loading: loadingDetail } =
    useMonitoringTable(tableName);

  useEffect(() => {
    setTitle(`Table ${tableName}`);
  });

  return (
    <div className="grid grid-cols-1 flex-1 items-stretch">
      <div className="grid grid-cols-1 px-6 md:px-20 md:grid-cols-4 gap-6 items-stretch">
        <StatCard
          title="Total Source"
          value={dataDetail?.data[0].RecordSource}
          loading={loadingDetail}
          darkMode={darkMode}
          description="Total source row count table"
        />
        <StatCard
          title="Total Target"
          value={dataDetail?.data[0].RecordDwh}
          loading={loadingDetail}
          darkMode={darkMode}
          description="Total target row count table"
        />
        <StatCard
          title="Total Different"
          value={dataDetail?.data[0].TotalDiffRecord}
          loading={loadingDetail}
          darkMode={darkMode}
          description="Total different row count table"
        />
        <StatCard
          title="Total Different Each Date"
          value={data?.data.countDiff}
          loading={loading}
          darkMode={darkMode}
          description="Total different row count table each date"
        />
      </div>
      <div className="w-full px-6 md:px-20 md:pt-6">
        <SourceTargetChartCard
          darkMode={darkMode}
          data={data ? data.data.detail : []}
          title={tableName}
          loading={loading}
          description={`Total In Range Row Count in Table ${tableName}`}
        />
      </div>
      <div className="w-full px-6 md:px-20 md:pt-6 md:pb-6">
        <SearchTableDetailCard 
            darkMode={darkMode}
            loading={loading}
            tableData={data?.data.detail}
        />
      </div>
    </div>
  );
}
