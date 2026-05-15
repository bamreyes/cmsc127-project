import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import DriversPage from "@/pages/Drivers/DriversPage";
import VehiclesPage from "@/pages/Vehicles/VehiclesPage";
import RegistrationsPage from "@/pages/Registrations/RegistrationsPage";
import ViolationsPage from "@/pages/Violations/ViolationsPage";
import ReportsPage from "@/pages/Reports/ReportsPage";
import { CreateDriverModal } from "@/components/modals/CreateModal";

import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />

        <main className="flex-1 p-8 animate-in fade-in duration-500">
          <Routes>
            <Route path="/" element={<Navigate to="/drivers" replace />} />
            <Route path="/drivers" element={<DriversPage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/registrations" element={<RegistrationsPage />} />
            <Route path="/violations" element={<ViolationsPage />} />
            <Route path="/test" element={<CreateDriverModal isOpen={true} onClose={() => {}} />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </main>
        <Toaster richColors position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
