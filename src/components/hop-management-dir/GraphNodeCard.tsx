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
  ArrowDownWideNarrow,
  CircleDot,
  Braces,
  Upload,
  Columns3,
  TableProperties,
  Workflow,
  ShieldCheck,
} from "lucide-react";

import "reactflow/dist/style.css";
import {
  HopReadFile,
  HopReadFileEdges,
  HopReadFileNodes,
  NestedDict,
} from "../../services/types/HopManagementDir.types";
import { ReactNode, useCallback, useEffect, useState } from "react";

type StatusType = "SUCCESS" | "ERROR";

export type PipelineNodeData = {
  title: string;
  subtitle: string;
  status: StatusType;
  icon: React.ReactNode;
  properties?: NestedDict;
};

function PipelineNode({ data }: { data: PipelineNodeData }) {
  const isSuccess = data.status === "SUCCESS";

  return (
    <>
      <div
        className={`relative cursor-pointer transition-shadow duration-300 ease-out hover:shadow-xl rounded-2xl border-2 bg-white px-5 py-4 shadow-sm ${
          isSuccess ? "border-green-300" : "border-red-300"
        }`}
      >
        <Handle
          type="target"
          position={Position.Left}
          className="h-3! w-3! bg-blue-500!"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="h-3! w-3! bg-blue-500!"
        />

        <div className="items-center">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              isSuccess ? "bg-blue-50" : "bg-red-50"
            }`}
          >
            {data.icon}
          </div>
        </div>
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
          strokeWidth: 1,
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
  GroupBy: <ArrowDownWideNarrow className="h-6 w-6 text-indigo-500" />,
  SortRows: <ArrowDownWideNarrow className="h-6 w-6 text-cyan-500" />,
  Dummy: <CircleDot className="h-6 w-6 text-gray-400" />,
  UserDefinedJavaClass: <Braces className="h-6 w-6 text-orange-500" />,
  PGBulkLoader: <Upload className="h-6 w-6 text-green-500" />,
  SelectValues: <Columns3 className="h-6 w-6 text-purple-500" />,
  Denormaliser: <TableProperties className="h-6 w-6 text-pink-500" />,
  StreamSchema: <Workflow className="h-6 w-6 text-sky-500" />,
  Validator: <ShieldCheck className="h-6 w-6 text-sky-500" />,
};

function mapHopStepToNode(step: HopReadFileNodes): Node<PipelineNodeData> {
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
      properties: step.properties,
    },
  };
}

function mapHopEdge(edge: HopReadFileEdges): Edge {
  return {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: "custom",
    data: {
      status: edge.status,
    },
  };
}

export type GraphNodeCardProps = {
  darkMode: boolean;
  dataRead: HopReadFile | null;
  setDataSelected: (value: PipelineNodeData) => void;
  setOpenPopUpDetail: (value: boolean) => void;
};

const nodeTypes = {
  pipeline: PipelineNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

export default function GraphNodeCard({
  darkMode,
  dataRead,
  setDataSelected,
  setOpenPopUpDetail,
}: GraphNodeCardProps) {
  const [nodes, setNodes] = useState<Node<PipelineNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

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

  useEffect(() => {
    if (!dataRead) return;
    setNodes(dataRead.nodes.map(mapHopStepToNode));
    setEdges(dataRead.edges.map(mapHopEdge));
  }, [dataRead]);

  const handleNodeClick = (
    _event: React.MouseEvent,
    node: Node<PipelineNodeData>,
  ) => {
    console.info(node.id);
    console.info(node.data);
    setDataSelected(node.data);
    setOpenPopUpDetail(true);
  };

  return (
    <ReactFlowProvider>
      <div
        className={`h-full w-full rounded-xl overflow-hidden border ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-200"}`}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          proOptions={{ hideAttribution: true }}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Background gap={24} size={1} />

          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
