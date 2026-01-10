import { useState } from "react";
import MainLayout from "./layout/MainLayout";
import ClientsPage from "./modules/clients/ClientsPage";

export default function App() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <MainLayout onAddClient={() => setOpenDrawer(true)}>
      <ClientsPage />
    </MainLayout>
  );
}
