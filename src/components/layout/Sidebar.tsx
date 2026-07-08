import { NavLink } from "react-router-dom";
const menuItems = [
  { label: "Dashboard", path: "/" },
  { label: "Characters", path: "/characters" },
  { label: "Inventory", path: "/inventory" },
  { label: "Calendar", path: "/calendar" },
  { label: "Analytics", path: "/analytics" },
  { label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-emerald-400">
          🌿 BerryMaster
        </h1>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
         <NavLink
  key={item.path}
  to={item.path}
  className={({ isActive }) =>
    `mb-2 block w-full rounded-lg px-4 py-3 transition ${
      isActive
        ? "bg-emerald-500 text-slate-950 font-semibold"
        : "hover:bg-slate-800"
    }`
  }
>
  {item.label}
</NavLink>
        ))}
      </nav>
    </aside>
  );
}