import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ClientsPage from "./modules/clients/ClientsPage";
import DashboardOverview from "./pages/dashboard/Overview";
import DashboardAnalytics from "./pages/dashboard/Analytics";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* default */}
          <Route path="/" element={<Navigate to="/dashboard/overview" />} />

          {/* dashboard */}
          <Route path="/dashboard/overview" element={<DashboardOverview />} />
          <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />

          {/* clients */}
          <Route path="/clients" element={<ClientsPage />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/dashboard/overview" />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
