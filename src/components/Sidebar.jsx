import {
  LayoutDashboard,
  Package,
  Truck,
  Warehouse,
  Boxes,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/products",
      icon: Package,
    },
    {
      name: "Suppliers",
      path: "/suppliers",
      icon: Truck,
    },
    {
      name: "Warehouses",
      path: "/warehouses",
      icon: Warehouse,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: Boxes,
    },
    {
      name: "Stock IN",
      path: "/stock-in",
      icon: ArrowDownToLine,
    },
    {
      name: "Stock OUT",
      path: "/stock-out",
      icon: ArrowUpFromLine,
    },
    {
      name: "Movements",
      path: "/movements",
      icon: History,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <aside className="sidebar">

      {/* =========================
          BRAND
      ========================= */}
      <div className="brand">

        <div className="brand-mark">
          W
        </div>

        <div>
          <h1>
            Warehouse<span>IQ</span>
          </h1>

          <p>
            Smart Warehouse & Inventory Management
          </p>
        </div>

      </div>


      {/* =========================
          NAVIGATION
      ========================= */}
      <nav className="sidebar-nav">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Icon size={19} />

              <span>
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;