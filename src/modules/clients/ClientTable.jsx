import { Pencil, Eye } from "lucide-react";

export default function ClientsTable({
  data,
  page = 1,
  pageSize = 10,
  onView,
  onEdit,
}) {
  return (
    <table className="w-full text-sm border-separate border-spacing-y-3">

      {/* HEADER */}
      <thead className="sticky top-0 z-10 bg-brand-bg">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
            SL NO
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
            PARTNER NAME
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
            DOMAIN
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
            COOLING OFF PERIOD
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
            STATUS
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
            ACTIONS
          </th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
              No clients found
            </td>
          </tr>
        )}

        {data.map((row, i) => (
          <tr
            key={row.id}
            className="
        bg-white
        shadow-sm
        hover:shadow-md
        transition
        rounded-lg
      "
          >
            <td className="pl-7 pr-7 py-3 rounded-l-xl">
              {(page - 1) * pageSize + i + 1}
            </td>


            <td className="px-4 py-3 font-medium text-slate-800">
              {row.name || "-"}
            </td>

            <td className="px-4 py-3 text-slate-500">
              {row.domain || "-"}
            </td>

            <td className="px-4 py-3">
              <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                {row.cool ?? "-"} days
              </span>
            </td>

            <td className="px-4 py-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${row.active
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
                  }`}
              >
                {row.active ? "Active" : "Inactive"}
              </span>
            </td>

            <td className="pl-4 pr-6 py-3 rounded-r-xl">
              <div className="flex items-center gap-2">
                <Pencil
                  className="h-4 w-4 cursor-pointer text-slate-500 hover:text-brand-dark"
                  onClick={() => onEdit(row)}
                />

                <Eye
                  className="h-4 w-4 cursor-pointer text-slate-500 hover:text-brand-dark"
                  onClick={() => {

                    onView(row.raw);
                  }}
                />

              </div>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}
