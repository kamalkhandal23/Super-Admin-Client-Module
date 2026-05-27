import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import ClientsTable from "./ClientTable";
import ClientDrawer from "./ClientDrawer";
import ClientViewDrawer from "./ClientViewDrawer";
import { fetchAllClients, fetchClientById } from "../../services/clientService";
import { useNavigate } from "react-router-dom";

export default function ClientsPage() {
  const navigate = useNavigate();
  const editRequestIdRef = useRef(0);
  const editInFlightRef = useRef(false);

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create");
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [viewData, setViewData] = useState(null);

  const loadClients = useCallback(async () => {
    setLoading(true);
    const raw = await fetchAllClients();
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
  }, []);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const loadClientById = async (row) => {
    try {
      return await fetchClientById(row.id);
    } catch {
      return row.raw;
    }
  };

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
            setDrawerMode("create");
            setDrawerLoading(false);
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
          onEdit={async (row) => {
            if (editInFlightRef.current) return;

            editInFlightRef.current = true;
            const requestId = editRequestIdRef.current + 1;
            editRequestIdRef.current = requestId;
            setDrawerMode("edit");
            setDrawerLoading(true);
            setEditData(null);
            setOpenDrawer(true);

            try {
              const client = await loadClientById(row);
              if (editRequestIdRef.current !== requestId) return;
              setEditData(client);
            } finally {
              if (editRequestIdRef.current === requestId) {
                setDrawerLoading(false);
                editInFlightRef.current = false;
              }
            }
          }}
          onView={(row) => {
            loadClientById(row).then((client) => {
              setViewData(client);
              setOpenView(true);
            });
          }}
        />

      </div>

      <ClientDrawer
        open={openDrawer}
        mode={drawerMode}
        loading={drawerLoading}
        editData={editData}
        onSaved={loadClients}
        onClose={() => {
          editRequestIdRef.current += 1;
          editInFlightRef.current = false;
          setOpenDrawer(false);
          setDrawerLoading(false);
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
