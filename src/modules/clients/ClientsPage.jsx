import { useState, useMemo, useEffect } from "react";
import ClientsHeader from "./ClientsHeader";
import ClientsTable from "./ClientTable";
import ClientsFooter from "./ClientsFooter";
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
      data = data.filter((c) => {
        const statusText = c.active ? "Active" : "Inactive";
        return statusText === statusFilter;
      });
    }
    

    return data;
  }, [clients, searchText, statusFilter]);

  console.log(
    "FILTERED:",
    filteredClients.map(
      (c) => `${c.name}-${c.active ? "Active" : "Inactive"}`
    )
  );
  
  const totalPages = Math.ceil(filteredClients.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredClients.slice(start, start + pageSize);
  }, [filteredClients, page, pageSize]);
  

  return (
    <>
      <div className="h-full flex flex-col bg-brand-bg rounded-xl border shadow-sm">
        <ClientsHeader
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
        />

        <div className="flex-1 overflow-y-auto px-3">
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading clients...
            </div>
          ) : (
            <ClientsTable
              data={paginatedData}
              page={page}
              pageSize={pageSize}
              onEdit={(row) => {
                setEditData(row.raw);
                setOpenDrawer(true);
              }}
              onView={(row) => {
                setViewData(row.raw);
                setOpenView(true);
              }}
            />
          )}
        </div>

        <ClientsFooter
          page={page}
          pageSize={pageSize}
          total={filteredClients.length}
          canPrev={page > 1}
          canNext={page < totalPages}
          onPrev={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
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
