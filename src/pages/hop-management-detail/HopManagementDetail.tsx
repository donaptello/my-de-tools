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

export default function HopManagementDetail() {
  const { darkMode, setTitle, setDesc } = useOutletContext<LayoutContextType>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pipelineId } = useParams<{ pipelineId?: string }>();
  const pipelineName = searchParams.get("pipelineName");

  useEffect(() => {
    setTitle("Hop Management Detail");
    setDesc(`Pipeline ${pipelineName}`);
  });
  return (
    <div className="grid grid-cols-1 px-10 md:px-40 flex-1 items-stretch">
      <button
        onClick={() => navigate("/hop-management")}
        className="flex items-center gap-2 text-sm font-medium hover:cursor-pointer text-blue-500 hover:text-blue-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <HeaderCard 
        darkMode={darkMode}
        pipelineId={pipelineId}
        pipelineName={pipelineName}
      />
    </div>
  );
}
