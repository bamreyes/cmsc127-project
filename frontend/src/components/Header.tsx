import { Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const Header = () => {
  const tabs = [
    { id: "drivers", label: "Drivers", path: "/drivers" },
    { id: "vehicles", label: "Vehicles", path: "/vehicles" },
    {
      id: "registrations",
      label: "Registrations",
      path: "/registrations",
    },
    {
      id: "violations",
      label: "Violations",
      path: "/violations",
    },
    { id: "reports", label: "Reports", path: "/reports" },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200">
      <div className="px-8 py-5 flex items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl shadow-lg shadow-blue-100">
            <Car className="text-white w-7 h-7" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight leading-tight">
              LTO Information Management System
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Land Transportation Office - Philippines
            </p>
          </div>
        </NavLink>

        <nav className="flex items-center gap-1 bg-slate-50/50 p-1 rounded-xl border border-slate-100">
          {tabs.map((tab) => {
            return (
              <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold outline-none",
                    isActive
                      ? "bg-white text-blue-600 border border-slate-200 ring-1 ring-slate-50"
                      : "text-slate-500 hover:text-slate-900 hover:bg-white/50",
                  )
                }
              >
                {tab.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
