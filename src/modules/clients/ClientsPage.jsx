import { useState, useMemo, useEffect } from "react";
import ClientsHeader from "./ClientsHeader";
import ClientsTable from "./ClientTable";
import ClientsFooter from "./ClientsFooter";
import ClientDrawer from "./ClientDrawer";
import { fetchClients } from "../../services/clientService";
import ClientViewDrawer from "./ClientViewDrawer";
import { useLocation, useNavigate } from "react-router-dom";

export default function ClientsPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editData, setEditData] = useState(null);

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(clients.length / pageSize);

  const paginatedData = useMemo(() => {
    if (!clients.length) return [];

    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * pageSize;

    return clients.slice(start, start + pageSize);
  }, [clients, page, pageSize, totalPages]);


  const [viewData, setViewData] = useState(null);
  const [openView, setOpenView] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/clients/add") {
      setEditData(null);
      setOpenDrawer(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const loadClients = async () => {
      setLoading(true);

      const rawData = await fetchClients();

      const normalized = rawData.map((item) => ({
        id: item.id,
        name: item.partnerName,
        domain: item.domain,
        cool: item.coolOffPeriodDays,
        active: item.activeFlag,
        raw: item,
      }));

      setClients(normalized);
      setPage(1);
      setLoading(false);
    };

    loadClients();
  }, []);


  return (
    <>
      <div className="h-full flex flex-col bg-brand-bg rounded-xl border border-slate-200 shadow-sm">

        <ClientsHeader
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
              onView={(row) => {
                setViewData(row);
                setOpenView(true);
              }}
              onEdit={(row) => {
                setEditData(row.raw);  
                setOpenDrawer(true);
              }}
            />

          )}
        </div>

        <ClientsFooter
          page={page}
          pageSize={pageSize}
          total={clients.length}
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
          onClose={() => {
            setOpenView(false);
            setViewData(null);
          }}
        />
      )}

    </>
  );
}
