import { Pencil, Eye, Trash2 } from "lucide-react";

export default function ClientsTable({
  data,
  page = 1,       
  pageSize = 10,   
}) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50 text-gray-600">
        <tr className="hover:bg-slate-50 transition odd:bg-white even:bg-slate-50/40">
          <th className="p-3 text-left">SL NO</th>
          <th className="p-3 text-left">PARTNER NAME</th>
          <th className="p-3 text-left">DOMAIN</th>
          <th className="p-3 text-left">COOLING OFF PERIOD</th>
          <th className="p-3 text-left">ACTIVE</th>
          <th className="p-3 text-left">ACTIONS</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={row.id} className="border-t hover:bg-gray-50">
            <td className="p-3">
              {(page - 1) * pageSize + i + 1}
            </td>

            <td className="p-3">{row.partnerName}</td>
            <td className="p-3">{row.domain}</td>
            <td className="p-3">{row.coolOffPeriodDays}</td>

            <td className="p-3">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  row.activeFlag
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {row.activeFlag ? "Active" : "Inactive"}
              </span>
            </td>

            <td className="p-3 flex gap-2 text-blue-600">
              <Pencil size={16} className="cursor-pointer text-slate-500 hover:text-blue-600 hover:scale-110 transition" />
              <Eye size={16} className="cursor-pointer text-slate-500 hover:text-blue-600 hover:scale-110 transition" />
              <Trash2 size={16} className="cursor-pointer text-slate-500 hover:text-blue-600 hover:scale-110 transition" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
