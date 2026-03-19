import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect } from "react";
import CardStatusHop from "../../components/hop-management/CardStatusHop";
import {
  useHopManagementStatus,
  useHopOrcestration,
} from "../../services/hooks/useHopManagement";
import SummaryCardHop from "../../components/hop-management/SummaryCardHop";
import { Activity, CheckCircle, GitBranch, XCircle } from "lucide-react";
import TableHop from "../../components/hop-management/TableHop";

export default function HopManagement() {
  const { darkMode, setTitle, setDesc } = useOutletContext<LayoutContextType>();
  const { data: status } = useHopManagementStatus();
  const { data: pipelineData, loading:loadingPipeline } = useHopOrcestration("Pipeline");
  const { data: workflowData, loading:loadingWorkflow } = useHopOrcestration("Workflow");

  useEffect(() => {
    setTitle("Hop Management");
    setDesc("Apache Hop monitoring overview");
  });
  return (
    <div className="grid grid-cols-1 px-10 md:px-40 flex-1 items-stretch">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 items-stretch">
        <CardStatusHop darkMode={darkMode} hopStatus={status?.data} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SummaryCardHop
          title="Pipeline Total"
          value={status?.data.pipelineStatus.total}
          darkMode={darkMode}
          icon={<Activity className="text-blue-500" />}
          bgIcon="bg-blue-100"
          stats={{
            success: status?.data.pipelineStatus.totalFinished,
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
            success: status?.data.workflowStatus.totalFinished,
            running: status?.data.workflowStatus.totalRunning,
            error: status?.data.workflowStatus.totalError,
          }}
        />

        <SummaryCardHop
          title="Total Finished"
          value={197}
          darkMode={darkMode}
          icon={<CheckCircle className="text-green-500" />}
          bgIcon="bg-green-100"
        />

        <SummaryCardHop
          title="Total Error"
          value={0}
          darkMode={darkMode}
          icon={<XCircle className="text-red-500" />}
          bgIcon="bg-red-100"
        />
      </div>

      <div className="mb-6">
        <TableHop
          darkMode={darkMode}
          data={pipelineData?.data}
          title="Pipeline"
          icon={<Activity className="text-gray-400" size={18} />}
          loading={loadingPipeline}
        />
      </div>

      <div className="mb-6">
        <TableHop
          darkMode={darkMode}
          data={workflowData?.data}
          title="Workflow"
          icon={<GitBranch className="text-gray-400" size={18} />}
          loading={loadingWorkflow}
        />
      </div>
    </div>
  );
}
