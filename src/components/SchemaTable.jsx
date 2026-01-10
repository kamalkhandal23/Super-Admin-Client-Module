export default function SchemaTable({ schema, data, onEdit }) {
  return (
    <table className="w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {schema.map((col) => (
            <th key={col.key} className="border px-3 py-2 text-left text-sm">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-gray-50">
            {schema.map((col) => (
              <td key={col.key} className="border px-3 py-2 text-sm">
                {col.type === "badge" ? (
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${
                      row[col.key] ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {row[col.key] ? "Active" : "Inactive"}
                  </span>
                ) : col.type === "actions" ? (
                  <button
                    className="text-blue-600 underline text-xs"
                    onClick={() => onEdit(row)}
                  >
                    Edit
                  </button>
                ) : (
                  row[col.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
