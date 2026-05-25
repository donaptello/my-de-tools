import {
  ChevronDown,
  Folder,
  FileCode2,
} from "lucide-react";

type TreeNode = {
  name: string;
  type: "folder" | "file";
  children?: TreeNode[];
};

const data = [
  "pipelines/dim_entitas_backup10022026.hpl",
  "pipelines/dim_entitas(cleaning).hpl",
  "pipelines/dim_entitas.hpl",
];

function buildTree(paths: string[]): TreeNode[] {
  const root: TreeNode[] = [];

  paths.forEach((path) => {
    const parts = path.split("/");

    let currentLevel = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;

      let existingNode = currentLevel.find(
        (node) => node.name === part
      );

      if (!existingNode) {
        existingNode = {
          name: part,
          type: isFile ? "file" : "folder",
          children: isFile ? undefined : [],
        };

        currentLevel.push(existingNode);
      }

      if (existingNode.children) {
        currentLevel = existingNode.children;
      }
    });
  });

  return root;
}

const treeData = buildTree(data);

function TreeItem({ node }: { node: TreeNode }) {
  if (node.type === "file") {
    return (
      <div className="flex items-center gap-2 py-1 pl-7 text-gray-500">
        <FileCode2
          size={18}
          className="text-blue-500 shrink-0"
        />

        <span className="truncate">{node.name}</span>
      </div>
    );
  }

  return (
    <div className="pl-2">
      <div className="flex items-center gap-2 py-2 text-gray-700">
        <ChevronDown
          size={16}
          className="text-gray-500"
        />

        <Folder
          size={18}
          className="text-yellow-500 shrink-0"
        />

        <span>{node.name}</span>
      </div>

      <div className="pl-4">
        {node.children?.map((child) => (
          <TreeItem
            key={child.name}
            node={child}
          />
        ))}
      </div>
    </div>
  );
}

export default function ExplorerCard() {
  return (
    <div className="w-[320px] rounded-2xl border bg-white shadow-sm overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b px-5 py-4">
        <Folder className="text-blue-500" />

        <h2 className="text-xl font-bold tracking-wide">
          EXPLORER
        </h2>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {treeData.map((node) => (
          <TreeItem
            key={node.name}
            node={node}
          />
        ))}
      </div>
    </div>
  );
}