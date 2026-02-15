import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ClientsPage from "./modules/clients/ClientsPage";
import DashboardOverview from "./pages/dashboard/Overview";
import DashboardAnalytics from "./pages/dashboard/Analytics";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Default route */}
          <Route index element={<Navigate to="/clients" replace />} />

          <Route path="clients" element={<ClientsPage />} />
          <Route path="dashboard/overview" element={<DashboardOverview />} />
          <Route path="dashboard/analytics" element={<DashboardAnalytics />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
