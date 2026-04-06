import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect, useState } from "react";
import CardStatusHop from "../../components/hop-management/CardStatusHop";
import {
  useHopManagementStatus,
  useHopOrcestration,
} from "../../services/hooks/useHopManagement";
import SummaryCardHop from "../../components/hop-management/SummaryCardHop";
import { Activity, CheckCircle, GitBranch, XCircle } from "lucide-react";
import TableHop from "../../components/hop-management/TableHop";
import AutoRefresh from "../../components/hop-management/AutoRefresh";

export default function HopManagement() {
  const { darkMode, setTitle, setDesc } = useOutletContext<LayoutContextType>();
  const [enabled, setEnabled] = useState(false);
  const {
    data: status,
    loading: loadingStatus,
    refetch,
  } = useHopManagementStatus();
  const {
    data: pipelineData,
    loading: loadingPipeline,
    setQuery: setQueryPipeline,
  } = useHopOrcestration("Pipeline");
  const {
    data: workflowData,
    loading: loadingWorkflow,
    setQuery: setQueryWorkflow,
  } = useHopOrcestration("Workflow");

  const handleRefresh = () => {
    setQueryPipeline((prev) => ({
      ...prev,
      _refresh: Date.now(),
    }));
    setQueryWorkflow((prev) => ({
      ...prev,
      _refresh: Date.now(),
    }));
    refetch();
  };

  const errorPipeline: number = status?.data.pipelineStatus?.totalError ?? 0;
  const errorWorkflow: number = status?.data.workflowStatus.totalError ?? 0;

  const finishedPipeline: number = (status?.data.pipelineStatus?.totalFinished ?? 0 - errorPipeline)
  const finishedWorkflow: number = (status?.data.workflowStatus?.totalFinished ?? 0 - errorWorkflow)

  useEffect(() => {
    setTitle("Hop Management");
    setDesc("Apache Hop monitoring overview");
  });
  return (
    <div className="grid grid-cols-1 px-10 md:px-40 flex-1 items-stretch">
      <div className="flex justify-end mb-6">
        <AutoRefresh
          darkMode={darkMode}
          onRefresh={() => {
            console.log("On Running: ", Date.now());
            handleRefresh();
          }}
          enabled={enabled}
          setEnabled={(value) => setEnabled(value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 items-stretch">
        <CardStatusHop
          loading={loadingStatus}
          darkMode={darkMode}
          hopStatus={status?.data}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SummaryCardHop
          title="Pipeline Total"
          value={status?.data.pipelineStatus.total}
          darkMode={darkMode}
          icon={<Activity className="text-blue-500" />}
          bgIcon="bg-blue-100"
          stats={{
            success: finishedPipeline,
            running: status?.data.pipelineStatus.totalRunning,
            error: status?.data.pipelineStatus.totalError,
          }}
        />

        <SummaryCardHop
          title="Workflow Total"
          value={status?.data.workflowStatus.total}
          darkMode={darkMode}
          icon={<GitBranch className="text-blue-500" />}
          bgIcon="bg-blue-100"
          stats={{
            success: finishedWorkflow,
            running: status?.data.workflowStatus.totalRunning,
            error: status?.data.workflowStatus.totalError,
          }}
        />

        <SummaryCardHop
          title="Total Finished"
          value={finishedPipeline + finishedWorkflow}
          darkMode={darkMode}
          icon={<CheckCircle className="text-green-500" />}
          bgIcon="bg-green-100"
        />

        <SummaryCardHop
          title="Total Error"
          value={errorPipeline + errorWorkflow}
          darkMode={darkMode}
          icon={<XCircle className="text-red-500" />}
          bgIcon="bg-red-100"
        />
      </div>

      <div className="mb-6">
        <TableHop
          darkMode={darkMode}
          mode="Pipeline"
          data={pipelineData?.data}
          title="Pipeline"
          icon={<Activity className="text-gray-400" size={18} />}
          loading={loadingPipeline}
          onSearch={(searchName, size, status, order, orderBy) => {
            setQueryPipeline({ search_name: searchName, size: size, status: status, order: order, orderBy: orderBy });
          }}
        />
      </div>

      <div className="mb-6">
        <TableHop
          darkMode={darkMode}
          mode="Workflow"
          data={workflowData?.data}
          title="Workflow"
          icon={<GitBranch className="text-gray-400" size={18} />}
          loading={loadingWorkflow}
          onSearch={(searchName, size, status, order, orderBy) => {
            setQueryWorkflow({ search_name: searchName, size: size, status: status, order: order, orderBy: orderBy });
          }}
        />
      </div>
    </div>
  );
}
