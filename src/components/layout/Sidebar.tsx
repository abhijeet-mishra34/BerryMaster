import { NavLink } from "react-router-dom";

import berryMasterIcon from "../../assets/brand/berrymaster-icon.png";

type SidebarProps = {
isOpen: boolean;
onToggleSidebar: () => void;
};

const menuItems = [
{
label: "Dashboard",
icon: "🏠",
path: "/",
},
{
label: "Characters",
icon: "👤",
path: "/characters",
},
{
label: "Berries",
icon: "🍓",
path: "/berries",
},
{
label: "Inventory",
icon: "📦",
path: "/inventory",
},
{
label: "Calendar",
icon: "📅",
path: "/calendar",
},
{
label: "Analytics",
icon: "📈",
path: "/analytics",
},
{
label: "Settings",
icon: "⚙️",
path: "/settings",
},
{
label: "Feedback",
icon: "💬",
path: "/feedback",
},
{
label: "About Us",
icon: "🌐",
path: "/about",
},
];

export default function Sidebar({
isOpen,
onToggleSidebar,
}: SidebarProps) {
return (
<aside
className={`         flex
        shrink-0
        flex-col
        border-r
        border-slate-800
        bg-slate-900
        transition-all
        duration-300
        ${
          isOpen
            ? "w-64"
            : "w-20"
        }
      `}
>
  {/* =====================================
    Sidebar Header
===================================== */}

<div
  className={`
    flex
    items-center
    border-b
    border-slate-800
    p-3
    ${
      isOpen
        ? "justify-between"
        : "justify-center"
    }
  `}
>

  {isOpen && (

    <div
      className="
        flex
        items-center
        gap-2.5
      "
    >

      <img
        src={berryMasterIcon}
        alt="BerryMaster logo"
        className="
          h-9
          w-9
          rounded-xl
          object-cover
          transition-transform
          duration-200
          hover:scale-105
        "
      />

      <h1
        className="
          text-xl
          font-bold
          tracking-tight
          text-emerald-400
        "
      >
        BerryMaster
      </h1>

    </div>

  )}

  {!isOpen && (

    <img
      src={berryMasterIcon}
      alt="BerryMaster logo"
      className="
        h-10
        w-10
        rounded-xl
        object-cover
        transition-transform
        duration-200
        hover:scale-105
      "
    />

  )}

  <button
    type="button"
    onClick={onToggleSidebar}
    className="
      rounded-lg
      p-2
      text-lg
      text-slate-400
      transition
      hover:bg-slate-800
      hover:text-white
    "
    aria-label="Toggle sidebar"
  >
    {isOpen ? "◀" : "▶"}
  </button>

</div>


  {/* =====================================
      Navigation
  ===================================== */}

  <nav className="flex flex-1 flex-col gap-2 p-3">

    {menuItems.map((item) => (

      <NavLink
        key={item.path}
        to={item.path}
        title={
          !isOpen
            ? item.label
            : undefined
        }
        className={({ isActive }) =>
          `
            flex
            items-center
            rounded-lg
            py-3
            transition-all
            duration-200
            ${
              isOpen
                ? "gap-3 px-4"
                : "justify-center px-2"
            }
            ${
              isActive
                ? "bg-emerald-500 font-semibold text-slate-950"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }
          `
        }
      >

        <span className="text-xl">
          {item.icon}
        </span>

        {isOpen && (

          <span>
            {item.label}
          </span>

        )}

      </NavLink>

    ))}

  </nav>

</aside>


);
}
