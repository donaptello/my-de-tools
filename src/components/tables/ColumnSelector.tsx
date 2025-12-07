interface Props {
  columns: string[];
  selectedColumns: string[];
  onChangeColumns: (columns: string[]) => void;
}

export default function ColumnSelector({
  columns,
  selectedColumns,
  onChangeColumns,
}: Props) {
  const toggleColumn = (col: string) => {
    if (selectedColumns.includes(col)) {
      onChangeColumns(selectedColumns.filter((c) => c !== col));
    } else {
      onChangeColumns([...selectedColumns, col]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition hover:shadow-2xl hover:-translate-y-1">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        Select Columns
      </h3>

      {columns.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No table selected</p>
      )}

      <div className="space-y-3">
        {columns.map((col) => (
          <label key={col} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedColumns.includes(col)}
              onChange={() => toggleColumn(col)}
              className="h-4 w-4 accent-blue-600"
            />
            <span className="text-gray-700 dark:text-gary-300">{col}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
