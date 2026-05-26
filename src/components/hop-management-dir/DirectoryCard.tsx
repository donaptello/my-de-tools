import {
  ChevronDown,
  Folder,
  FileCode2,
  FolderTree,
  ChevronRight,
  FolderOpen,
} from "lucide-react";
import { useState } from "react";

type TreeNode = {
  name: string;
  type: "folder" | "file";
  children?: TreeNode[];
};

const data = [
  "pipelines/entitas/dim_entitas(cleaning).hpl",
  "pipelines/entitas/dim_entitas.hpl",
  "pipelines/backup/dim_entitas_backup10022026.hpl",
];

function buildTree(paths: string[]): TreeNode[] {
  const root: TreeNode[] = [];

  paths.forEach((path) => {
    const parts = path.split("/");

    let currentLevel = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;

      let existingNode = currentLevel.find((node) => node.name === part);

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

type TreeItemProps = {
  node: TreeNode;
  level?: number;
};

function TreeItem({ node, level = 0 }: TreeItemProps) {
  const [open, setOpen] = useState(false);

  const paddingLeftFolder = `${level * 12}px`;
  const paddingLeftFile = `${level * 22}px`;
  if (node.type === "file") {
    return (
      <div
        style={{ paddingLeft: paddingLeftFile }}
        className="group flex items-center gap-2 rounded-md py-1.5 pr-2 font-light text-xs text-gray-600 transition hover:bg-gray-100"
      >
        <FileCode2 size={12} className="shrink-0 text-blue-500" />

        <span className="truncate">{node.name}</span>
      </div>
    );
  }

  return (
    <div>
      {/* FOLDER */}
      <button
        onClick={() => setOpen(!open)}
        style={{ paddingLeft: paddingLeftFolder }}
        className="group flex w-full items-center gap-2 rounded-md py-1.5 pr-2 font-light text-xs text-gray-700 transition hover:bg-gray-100"
      >
        {open ? (
          <ChevronDown size={12} className="text-gray-400" />
        ) : (
          <ChevronRight size={12} className="text-gray-400" />
        )}

        {open ? (
          <FolderOpen size={12} className="shrink-0 text-yellow-500" />
        ) : (
          <Folder size={12} className="shrink-0 text-yellow-500" />
        )}

        <span className="truncate">{node.name}</span>
      </button>

      {/* CHILDREN */}
      {open && (
        <div className="mt-0.5">
          {node.children?.map((child) => (
            <TreeItem
              key={`${node.name}-${child.name}`}
              node={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExplorerCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-gray-50 border-gray-200">
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-3 py-2">
        <FolderTree size={12} className="text-blue-500" />

        <h2 className="text-xs font-bold tracking-wide">EXPLORER</h2>
      </div>

      {/* CONTENT */}
      <div className="p-2 overflow-y-auto flex-1">
        {treeData.map((node) => (
          <TreeItem key={node.name} node={node} />
        ))}
      </div>
    </div>
  );
}
