import { useState, useMemo, useEffect } from "react";
import ClientsTable from "./ClientTable";
import ClientDrawer from "./ClientDrawer";
import ClientViewDrawer from "./ClientViewDrawer";
import { fetchClients } from "../../services/clientService";
import { useNavigate } from "react-router-dom";

export default function ClientsPage() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [viewData, setViewData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const raw = await fetchClients();
      const normalized = raw.map((item) => ({
        id: item.id,
        name: item.partnerName,
        domain: item.domain,
        cool: item.coolOffPeriodDays,
        active: item.activeFlag,
        raw: item,
      }));
      setClients(normalized);
      setLoading(false);
    };
    load();
  }, []);

  const filteredClients = useMemo(() => {
    let data = [...clients];

    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q)
      );
    }

    if (statusFilter) {
      data = data.filter((c) =>
        (c.active ? "Active" : "Inactive") === statusFilter
      );
    }

    return data;
  }, [clients, searchText, statusFilter]);

  const totalPages = Math.ceil(filteredClients.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredClients.slice(start, start + pageSize);
  }, [filteredClients, page, pageSize]);

  return (
    <>
      <div className="bg-[#F8FAFC] min-h-screen px-8 py-8">


        
          <ClientsTable
            data={paginatedData}
            loading={loading}
            page={page}
            pageSize={pageSize}
            total={filteredClients.length}
            totalPages={totalPages}
            searchText={searchText}
            statusFilter={statusFilter}
            onSearchChange={(v) => {
              setSearchText(v);
              setPage(1);
            }}
            onStatusChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
            onAddClient={() => {
              setEditData(null);
              setOpenDrawer(true);
            }}
            onPrev={() => setPage((p) => Math.max(p - 1, 1))}
            onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
            canPrev={page > 1}
            canNext={page < totalPages}
            onEdit={(row) => {
              setEditData(row.raw);
              setOpenDrawer(true);
            }}
            onView={(row) => {
              setViewData(row.raw);
              setOpenView(true);
            }}
          />
        
      </div>

      <ClientDrawer
        open={openDrawer}
        editData={editData}
        onClose={() => {
          setOpenDrawer(false);
          navigate("/clients");
        }}
      />

      {openView && viewData && (
        <ClientViewDrawer
          open={openView}
          data={viewData}
          onClose={() => setOpenView(false)}
        />
      )}
    </>
  );
}
