import {
  Background,
  Controls,
  Node,
  Position,
  ReactFlow,
  ReactFlowProvider,
  Handle,
  BaseEdge,
  getBezierPath,
  EdgeProps,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Edge,
} from "reactflow";

import {
  Database,
  Filter,
  Combine,
  FileOutput,
  CircleHelp,
} from "lucide-react";

import "reactflow/dist/style.css";
import {
  HopReadFile,
  HopReadFileNodes,
} from "../../services/types/HopManagementDir.types";
import { ReactNode, useCallback, useState } from "react";

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
    <>
      <div
        className={`relative rounded-2xl border-2 bg-white px-5 py-4 shadow-sm ${
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

        <div className="items-center">
          {/* ICON */}
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              isSuccess ? "bg-blue-50" : "bg-red-50"
            }`}
          >
            {data.icon}
          </div>
        </div>
        {/* Title */}
      </div>
      <div className="absolute items-center">{data.title}</div>
    </>
  );
}

type EdgeData = {
  status?: "SUCCESS" | "ERROR";
};

function CustomEdge(props: EdgeProps<EdgeData>) {
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
  const [nodes, setNodes] = useState<Node[]>(mappedNodes ?? []);
  const [edges, setEdges] = useState<Edge[]>(dataRead?.edges ?? []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot: Node[]) =>
        applyNodeChanges(changes, nodesSnapshot),
      ),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot: Edge[]) =>
        applyEdgeChanges(changes, edgesSnapshot),
      ),
    [],
  );

  return (
    <ReactFlowProvider>
      <div
        className={`h-full w-full rounded-xl overflow-hidden border ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-200"}`}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{
            pipeline: PipelineNode,
          }}
          edgeTypes={{
            custom: CustomEdge,
          }}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
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
