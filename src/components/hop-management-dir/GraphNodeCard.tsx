import {
  Background,
  Controls,
  Edge,
  Node,
  Position,
  ReactFlow,
  ReactFlowProvider,
  Handle,
  BaseEdge,
  getBezierPath,
} from "reactflow";

import {
  Database,
  Filter,
  CircleCheck,
  CircleX,
  Combine,
  FileOutput,
  CircleHelp,
} from "lucide-react";

import "reactflow/dist/style.css";
import {
  HopReadFile,
  HopReadFileNodes,
} from "../../services/types/HopManagementDir.types";
import { ReactNode } from "react";

type StatusType = "SUCCESS" | "ERROR";

type PipelineNodeData = {
  title: string;
  subtitle: string;
  status: StatusType;
  icon: React.ReactNode;
};

function PipelineNode({ data }: { data: PipelineNodeData }) {
  const isSuccess = data.status === "SUCCESS";

  return (
    <div
      className={`relative min-w-[250px] rounded-2xl border-2 bg-white px-5 py-4 shadow-sm ${
        isSuccess ? "border-green-300" : "border-red-300"
      }`}
    >
      {/* LEFT HANDLE */}
      <Handle
        type="target"
        position={Position.Left}
        className="h-3! w-3! bg-blue-500!"
      />

      {/* RIGHT HANDLE */}
      <Handle
        type="source"
        position={Position.Right}
        className="h-3! w-3! bg-blue-500!"
      />

      <div className="flex items-center gap-4">
        {/* ICON */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
            isSuccess ? "bg-blue-50" : "bg-red-50"
          }`}
        >
          {data.icon}
        </div>

        {/* TEXT */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">{data.title}</h2>

          <p className="text-lg text-gray-500">{data.subtitle}</p>
        </div>

        {/* STATUS */}
        <div>
          {isSuccess ? (
            <CircleCheck className="text-green-500" />
          ) : (
            <CircleX className="text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
}

function CustomEdge(props: any) {
  const [path] = getBezierPath(props);

  return (
    <>
      <BaseEdge
        path={path}
        style={{
          stroke: props.data?.status === "ERROR" ? "#ef4444" : "#22c55e",
          strokeWidth: 2,
        }}
      />
    </>
  );
}

const nodeTypes = {
  pipeline: PipelineNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const nodes: Node[] = [
  {
    id: "1",
    type: "pipeline",
    position: { x: 100, y: 250 },
    data: {
      title: "Table Input",
      subtitle: "TableInput",
      status: "SUCCESS",
      icon: <Database className="h-6 w-6 text-blue-500" />,
    },
  },

  {
    id: "2",
    type: "pipeline",
    position: { x: 500, y: 250 },
    data: {
      title: "Filter Rows",
      subtitle: "FilterRows",
      status: "SUCCESS",
      icon: <Filter className="h-6 w-6 text-blue-500" />,
    },
  },

  {
    id: "3",
    type: "pipeline",
    position: { x: 900, y: 150 },
    data: {
      title: "Table Output",
      subtitle: "TableOutput",
      status: "SUCCESS",
      icon: <Database className="h-6 w-6 text-blue-500" />,
    },
  },

  {
    id: "4",
    type: "pipeline",
    position: { x: 900, y: 350 },
    data: {
      title: "Reject Rows",
      subtitle: "WriteToLog",
      status: "ERROR",
      icon: <CircleX className="h-6 w-6 text-red-500" />,
    },
  },
];

const edges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "custom",
    data: {
      status: "SUCCESS",
    },
  },

  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "custom",
    data: {
      status: "SUCCESS",
    },
  },

  {
    id: "e2-4",
    source: "2",
    target: "4",
    type: "custom",
    data: {
      status: "ERROR",
    },
  },
];

const stepIcons: Record<string, ReactNode> = {
  TableInput: <Database className="h-6 w-6 text-blue-500" />,
  FilterRows: <Filter className="h-6 w-6 text-blue-500" />,
  ConcatFields: <Combine className="h-6 w-6 text-blue-500" />,
  TableOutput: <FileOutput className="h-6 w-6 text-blue-500" />,
};

function mapHopStepToNode(step: HopReadFileNodes): Node {
  return {
    id: step.id,
    type: "pipeline",
    position: {
      x: Number(step.properties.GUI?.xloc || 0),
      y: Number(step.properties.GUI?.yloc || 0),
    },
    data: {
      title: step.label,
      subtitle: step.type,
      status: "SUCCESS",
      icon: stepIcons[step.type] || (
        <CircleHelp className="h-6 w-6 text-gray-400" />
      ),
    },
  };
}

export type GraphNodeCardProps = {
  darkMode: boolean;
  dataRead: HopReadFile | null;
};

export default function GraphNodeCard({
  darkMode,
  dataRead,
}: GraphNodeCardProps) {
  const mappedNodes = dataRead?.nodes.map(mapHopStepToNode);
  const edges = dataRead?.edges;

  return (
    <ReactFlowProvider>
      <div
        className={`h-full w-full rounded-xl overflow-hidden border ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-200"}`}
      >
        <ReactFlow
          nodes={mappedNodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          proOptions={{ hideAttribution: true }}
          fitView
        >
          <Background gap={24} size={1} />

          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
