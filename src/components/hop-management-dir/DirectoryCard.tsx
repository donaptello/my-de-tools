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
  path: string;
  children?: TreeNode[];
};

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
          path: path,
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

type TreeItemProps = {
  node: TreeNode;
  level?: number;
  selected: string | null;
  setSelected: (value: string) => void;
};

function TreeItem({ node, level = 0, selected, setSelected }: TreeItemProps) {
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

        <span
          onClick={() => {
            setSelected(node.path);
          }}
          className="truncate"
        >
          {node.name}
        </span>
      </div>
    );
  }

  return (
    <div>
      {/* FOLDER */}
      <button
        onClick={() => {
          setOpen(!open);
        }}
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
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type ExploreCardProps = {
  darkMode: boolean;
  selected: string | null;
  setSelected: (value: string) => void;
  data: string[] | undefined;
};

export default function ExplorerCard({
  darkMode,
  selected,
  setSelected,
  data,
}: ExploreCardProps) {
  const treeData = buildTree(data ?? []);

  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-3 py-2">
        <FolderTree size={12} className="text-blue-500" />

        <h2 className="text-xs font-bold tracking-wide">EXPLORER</h2>
      </div>

      {/* CONTENT */}
      <div className="p-2 overflow-y-auto flex-1">
        {treeData.map((node) => (
          <TreeItem
            key={node.name}
            node={node}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
}
