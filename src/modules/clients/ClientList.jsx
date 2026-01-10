import { useEffect, useState } from "react";
import { fetchClients } from "../../services/clientService";
import SchemaTable from "../../components/SchemaTable";
import ClientDrawer from "./ClientDrawer";
import { CLIENT_TABLE_SCHEMA } from "./schemas/clientTable.schema";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const data = await fetchClients();
    setClients(data);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setOpen(true);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Clients</h1>

        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Client
        </button>
      </div>

      <SchemaTable
        schema={CLIENT_TABLE_SCHEMA}
        data={clients}
        onEdit={handleEdit}
      />

      <ClientDrawer
        open={open}
        editData={editData}
        onClose={() => setOpen(false)}
        onSaved={() => {
          loadClients(); 
        }}
      />
    </div>
  );
}
