import { useEffect, useRef, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { UsersData } from "../../services/types/Users.types";

interface Props {
  userData?: UsersData[];
  darkMode: boolean;
}

export default function TableUsers({ userData, darkMode }: Props) {
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const [maxHeightStyle, setMaxHeightStyle] = useState<
    React.CSSProperties | undefined
  >(undefined);
  useEffect(() => {
    function updateMaxHeight() {
      const top = tableScrollRef.current?.getBoundingClientRect().top ?? 0;
      const viewportHeight = window.innerHeight;
      const reserved = 90;
      const available = Math.max(200, viewportHeight - top - reserved);
      setMaxHeightStyle({ maxHeight: `${available}px` });
    }

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);
    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);

  return (
    <div
      className={`rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} border border-transparent shadow-sm transition hover:shadow-2xl hover:-translate-y-1`}
    >
      <div
        ref={tableScrollRef}
        style={maxHeightStyle}
        className="overflow-auto rounded-t-xl"
      >
        <table className="min-w-full text-sm">
          {/* HEADER */}
          <thead
            className={`${
              darkMode
                ? "bg-gray-900/80 text-gray-400 border-b border-gray-700"
                : "bg-white/80 text-gray-500 border-b border-gray-200"
            }`}
          >
            <tr className="text-left">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                User Full Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody
            className={`divide-y ${
              darkMode ? "divide-gray-700" : "divide-gray-100"
            }`}
          >
            {(!userData || userData.length === 0) && (
              <tr>
                <td colSpan={4} className="text-center py-16">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-400">
                      Belum ada pengguna
                    </p>
                    <p className="text-xs text-gray-400">
                      Tambahkan pengguna untuk mulai mengelola akses.
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {userData?.map((user) => {
              const created = user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "-";

              return (
                <tr
                  key={user.id}
                  className={`group transition-all duration-200 ${
                    darkMode ? "hover:bg-gray-700/40" : "hover:bg-gray-50"
                  }`}
                >
                  {/* Nama */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="truncate max-w-60">{user.username}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="truncate max-w-60">{user.username}</span>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-blue-500/10 text-blue-500"
                          : user.role === "USER"
                            ? darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-600"
                            : darkMode
                              ? "bg-gray-700 text-gray-400"
                              : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-blue-500/10 text-blue-500"
                          : user.role === "USER"
                            ? darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-600"
                            : darkMode
                              ? "bg-gray-700 text-gray-400"
                              : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {null}
                    </span>
                  </td>

                  {/* Created */}
                  <td className="px-6 py-4 text-sm text-gray-400">{created}</td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition">
                      <button
                        aria-label={`Edit ${user.username}`}
                        className={`p-2 rounded-lg transition ${
                          darkMode
                            ? "hover:bg-gray-700 hover:text-blue-400"
                            : "hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        aria-label={`Delete ${user.username}`}
                        className={`p-2 rounded-lg transition ${
                          darkMode
                            ? "hover:bg-gray-700 hover:text-red-400"
                            : "hover:bg-red-50 hover:text-red-500"
                        }`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        className={`px-6 py-3 text-sm rounded-b-xl ${darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-50 text-gray-500"}`}
      >
        {userData?.length ?? 0} user ditampilkan
      </div>
    </div>
  );
}
