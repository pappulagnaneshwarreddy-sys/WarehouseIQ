import { useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const username =
    localStorage.getItem("warehouseiq_user") || "Admin1";

  const role =
    localStorage.getItem("warehouseiq_role") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("warehouseiq_user");
    localStorage.removeItem("warehouseiq_role");

    navigate("/");
  };

  const notifications = [
    {
      id: 1,
      title: "Low Stock Alert",
      message: "Keyboard stock is below minimum level.",
      type: "warning",
      icon: AlertTriangle,
    },
    {
      id: 2,
      title: "Stock IN",
      message: "20 Keyboards were added to inventory.",
      type: "success",
      icon: ArrowDownToLine,
    },
    {
      id: 3,
      title: "Stock OUT",
      message: "5 Mice were dispatched.",
      type: "danger",
      icon: ArrowUpFromLine,
    },
  ];

  const displayRole =
    role === "Admin" ? "Administrator" : "Employee";

  return (
    <header className="navbar">

      {/* =========================
          LEFT
      ========================= */}
      <div className="navbar-left">
        <span className="navbar-title">
          WarehouseIQ
        </span>
      </div>


      {/* =========================
          RIGHT
      ========================= */}
      <div className="navbar-right">

        {/* =================================================
            NOTIFICATION
        ================================================= */}
        <div className="wiq-notification-wrapper">

          <button
            type="button"
            className="wiq-notification-button"
            onClick={() =>
              setShowNotifications((prev) => !prev)
            }
          >
            <Bell size={21} />

            <span className="wiq-notification-count">
              {notifications.length}
            </span>
          </button>


          {/* =================================================
              NOTIFICATION PANEL
          ================================================= */}
          {showNotifications && (
            <div className="wiq-notification-panel">

              {/* Header */}
              <div className="wiq-notification-header">

                <div>
                  <h3>Notifications</h3>
                  <p>Warehouse updates</p>
                </div>

                <span className="wiq-notification-badge">
                  {notifications.length} New
                </span>

              </div>


              {/* Notifications */}
              <div className="wiq-notification-list">

                {notifications.map((notification) => {
                  const Icon = notification.icon;

                  return (
                    <div
                      key={notification.id}
                      className="wiq-notification-item"
                    >

                      <div
                        className={`wiq-notification-icon ${notification.type}`}
                      >
                        <Icon size={17} />
                      </div>


                      <div className="wiq-notification-text">

                        <h4>
                          {notification.title}
                        </h4>

                        <p>
                          {notification.message}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>


              {/* Footer */}
              <button
                type="button"
                className="wiq-notification-footer"
                onClick={() => {
                  setShowNotifications(false);
                  navigate("/movements");
                }}
              >
                View Movement History
              </button>

            </div>
          )}
        </div>


        {/* =================================================
            USER
        ================================================= */}
        <div
          className="user-menu"
          onMouseEnter={() => setShowUserMenu(true)}
          onMouseLeave={() => setShowUserMenu(false)}
        >

          <div className="user-avatar">
            {username.charAt(0).toUpperCase()}
          </div>

          <div className="user-info">

            <span className="user-name">
              {username}
            </span>

            <span className="user-role">
              {displayRole}
            </span>

          </div>

          <ChevronDown size={17} />


          {/* Logout */}
          {showUserMenu && (
            <div className="user-dropdown">

              <button
                type="button"
                className="navbar-logout-button"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;