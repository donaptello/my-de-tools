interface Props {
  columns: string[];
  selectedColumns: string[];
  onChangeColumns: (columns: string[]) => void;
  darkMode: boolean;
}

export default function ColumnSelector({
  columns,
  selectedColumns,
  onChangeColumns,
  darkMode,
}: Props) {

  const toggleColumn = (col: string) => {
    if (selectedColumns.includes(col)) {
      onChangeColumns(selectedColumns.filter((c) => c !== col));
    } else {
      onChangeColumns([...selectedColumns, col]);
    }
  };

  const toggleSelectAll = () => {
    onChangeColumns([...columns])
  }

  return (
    <div className={`rounded-xl shadow-lg p-5 transition hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Select Columns
        </h3>
        <button
            onClick={toggleSelectAll}
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
        >
            Select All
        </button>
      </div>

      {columns.length === 0 && (
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No table selected</p>
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
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{col}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
