interface Props {
  tables: string[];
  selectedTable: string;
  onSelectTable: (value: string) => void;
}

export default function TableSelector({
  tables,
  selectedTable,
  onSelectTable,
}: Props) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 
      transition hover:shadow-2xl hover:-translate-y-1"
    >
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        Select Table
      </h3>

      <select
        value={selectedTable}
        onChange={(e) => onSelectTable(e.target.value)}
        className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-700 
        dark:text-white focus:ring focus:ring-blue-300"
      >
        <option value="">-- Choose Table --</option>
        {tables.map((table) => (
          <option key={table} value={table}>
            {table}
          </option>
        ))}
      </select>
    </div>
  );
}
