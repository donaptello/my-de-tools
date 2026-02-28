import { Plus, Search } from "lucide-react";
import { useState } from "react";

interface Props {
  darkMode: boolean;
  onAdd?: () => void;
  setQuery?: (search: string, role: string, status: string) => void;
}

export default function FilterUsers({ darkMode, onAdd, setQuery }: Props) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
  });

  return (
    <div
      className="p-1 mb-5"
    >
      <div className="flex gap-3">
        {/* Search Input - Full Width */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <Search className="h-5 w-5 text-blue-600" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              setQuery?.(value, filters.role, filters.status);
            }}
            placeholder="Search user..."
            className={`flex-1 rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
              darkMode
                ? "text-gray-200 bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring-blue-900"
                : "text-gray-700 bg-white border border-gray-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
        </div>

        {/* Filters and Add Button Row */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filters.role}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, layer: e.target.value }));
              setQuery?.(search, e.target.value, filters.status);
            }}
            className={`rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 border ${
              darkMode
                ? "text-gray-200 bg-gray-700 border-gray-600 focus:border-blue-400 focus:ring-blue-900"
                : "text-gray-700 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          >
            <option value="all">All Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="data-analisis">Data Analisis</option>
            <option value="data-engineer">Data Engineer</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, flag: e.target.value }));
              setQuery?.(search, filters.role, e.target.value);
            }}
            className={`rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 border ${
              darkMode
                ? "text-gray-200 bg-gray-700 border-gray-600 focus:border-blue-400 focus:ring-blue-900"
                : "text-gray-700 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          >
            <option value="active">Active</option>
            <option value="disable">Disable</option>
          </select>

          <button
            type="button"
            onClick={() =>
              typeof onAdd === "function"
                ? onAdd()
                : console.warn("onAdd not provided")
            }
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-200"
            }`}
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}
