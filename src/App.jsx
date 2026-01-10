import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ClientsPage from "./modules/clients/ClientsPage";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/clients" />} />
          <Route path="/clients" element={<ClientsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
