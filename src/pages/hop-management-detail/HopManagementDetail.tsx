import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import HeaderCard from "../../components/hop-management-detail/HeaderCard";
import StatCard from "../../components/hop-management-detail/StatCard";
import TableHopProcess from "../../components/hop-management-detail/TableHopProcess";
import { useHopPipelineDetail } from "../../services/hooks/useHopManagement";
import AutoRefresh from "../../components/hop-management/AutoRefresh";
import LoggingHop from "../../components/hop-management-detail/LoggingCard";

export default function HopManagementDetail() {
  const { darkMode, setTitle, setDesc } = useOutletContext<LayoutContextType>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { pipelineId } = useParams<{ pipelineId?: string }>();
  const pipelineName = searchParams.get("pipelineName");

  const { data, loading, refetch } = useHopPipelineDetail(
    pipelineId,
    pipelineName,
  );

  const progressPercentage = (): number => {
    const readValue = data?.data?.[0]?.totalRead ?? 0;
    const writtenValue = data?.data?.[0]?.totalWritten ?? 0;

    if (readValue === 0) return 0;

    return (writtenValue / readValue) * 100;
  };

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    setTitle("Hop Management Detail");
    setDesc(`Pipeline ${pipelineName}`);
  });
  return (
    <div className="grid grid-cols-1 px-10 md:px-40 flex-1 items-stretch">
      <div className="flex justify-between mb-6">
        <button
          onClick={() => navigate("/hop-management")}
          className="flex items-center gap-2 text-sm font-medium hover:cursor-pointer text-blue-500 hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <AutoRefresh
          darkMode={darkMode}
          onRefresh={() => {
            console.log("On Running: ", Date.now());
            handleRefresh();
          }}
        />
      </div>

      <HeaderCard
        darkMode={darkMode}
        pipelineId={pipelineId}
        pipelineName={pipelineName}
        headerData={{
          duration: data?.data[0].duration,
          startDate: data?.data[0].startDate,
          status: data?.data[0].status,
          progress: progressPercentage(),
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          darkMode={darkMode}
          statName="Total Read"
          statValue={data?.data[0].totalRead}
        />
        <StatCard
          darkMode={darkMode}
          statName="Total Written"
          statValue={data?.data[0].totalWritten}
        />
        <StatCard
          darkMode={darkMode}
          statName="Transforms"
          statValue={data?.data[0].totalTransform}
        />
        <StatCard
          darkMode={darkMode}
          statName="Total Errors"
          statValue={data?.data[0].totalError}
        />
      </div>

      <div className="mb-6">
        <TableHopProcess
          darkMode={darkMode}
          loading={loading}
          transformDetail={data?.data[0].transformStatusList}
          updatedAt={data?.data[0].updatedAt}
        />
      </div>

      <div className="mb-6">
        <LoggingHop 
          darkMode={darkMode}
          loading={loading}
          loggingString={data?.data[0].loggingString}
        />
      </div>
    </div>
  );
}
