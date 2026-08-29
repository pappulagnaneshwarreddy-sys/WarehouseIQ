import {
  Package,
  Boxes,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

function Dashboard() {
  // Get logged-in user's role
  const role = localStorage.getItem("warehouseiq_role");

  const isAdmin = role === "Admin";

  const lowStockProducts = [
    {
      product: "Keyboard",
      sku: "KB001",
      current: 8,
      minimum: 10,
    },
    {
      product: "Mouse",
      sku: "MS001",
      current: 4,
      minimum: 5,
    },
    {
      product: "Monitor",
      sku: "MN001",
      current: 3,
      minimum: 5,
    },
    {
      product: "Printer",
      sku: "PR001",
      current: 2,
      minimum: 5,
    },
  ];

  const movements = [
    {
      date: "18 Aug 2026, 10:30 AM",
      product: "Keyboard",
      type: "IN",
      quantity: "+20",
      user: "Admin",
    },
    {
      date: "18 Aug 2026, 09:15 AM",
      product: "Mouse",
      type: "OUT",
      quantity: "-5",
      user: "Employee",
    },
    {
      date: "17 Aug 2026, 04:45 PM",
      product: "Monitor",
      type: "IN",
      quantity: "+10",
      user: "Admin",
    },
    {
      date: "17 Aug 2026, 03:20 PM",
      product: "Printer",
      type: "OUT",
      quantity: "-2",
      user: "Employee",
    },
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">

          <div className="page-header">
            <div>
              <h2>Dashboard</h2>
              <p>Overview of your warehouse operations</p>
            </div>
          </div>

          {/* Dashboard Statistics */}
          <section className="stats-grid">

            <StatCard
              title="Total Products"
              value="120"
              description="All products"
              icon={Package}
              type="navy"
            />

            <StatCard
              title="Total Stock"
              value="2,450"
              description="Across all warehouses"
              icon={Boxes}
              type="teal"
            />

            <StatCard
              title="Low Stock Items"
              value="8"
              description="Require attention"
              icon={AlertTriangle}
              type="gold"
            />

            {/* Stock Value - ADMIN ONLY */}
            {isAdmin && (
              <StatCard
                title="Stock Value"
                value="₹5,40,000"
                description="Estimated total value"
                icon={IndianRupee}
                type="green"
              />
            )}

          </section>

          {/* Low Stock + Recent Movements */}
          <section className="dashboard-grid">

            <div className="panel">
              <div className="panel-header">
                <h3>Low Stock Alert</h3>
                <button className="text-button">
                  View all
                </button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Current Stock</th>
                      <th>Min. Stock</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {lowStockProducts.map((item) => (
                      <tr key={item.sku}>
                        <td>{item.product}</td>
                        <td>{item.sku}</td>
                        <td>{item.current}</td>
                        <td>{item.minimum}</td>
                        <td>
                          <span className="badge warning">
                            Low Stock
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h3>Recent Movements</h3>
                <button className="text-button">
                  View all
                </button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Product</th>
                      <th>Type</th>
                      <th>Qty</th>
                      <th>User</th>
                    </tr>
                  </thead>

                  <tbody>
                    {movements.map((movement, index) => (
                      <tr key={index}>
                        <td>{movement.date}</td>
                        <td>{movement.product}</td>

                        <td>
                          <span
                            className={
                              movement.type === "IN"
                                ? "badge success"
                                : "badge danger"
                            }
                          >
                            {movement.type}
                          </span>
                        </td>

                        <td>{movement.quantity}</td>
                        <td>{movement.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </section>

          {/* Inventory Summary */}
          <section className="panel">

            <div className="panel-header">
              <h3>Inventory Summary</h3>
              <button className="text-button">
                View all
              </button>
            </div>

            <div className="table-wrapper">
              <table>

                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Total Stock</th>
                    <th>Reserved Stock</th>
                    <th>Available Stock</th>

                    {/* Stock Value - ADMIN ONLY */}
                    {isAdmin && <th>Stock Value</th>}

                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>Keyboard</td>
                    <td>100</td>
                    <td>20</td>
                    <td>80</td>

                    {/* Stock Value - ADMIN ONLY */}
                    {isAdmin && <td>₹50,000</td>}

                    <td>
                      <span className="badge success">
                        Healthy
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Mouse</td>
                    <td>200</td>
                    <td>30</td>
                    <td>170</td>

                    {/* Stock Value - ADMIN ONLY */}
                    {isAdmin && <td>₹60,000</td>}

                    <td>
                      <span className="badge success">
                        Healthy
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Monitor</td>
                    <td>50</td>
                    <td>5</td>
                    <td>45</td>

                    {/* Stock Value - ADMIN ONLY */}
                    {isAdmin && <td>₹4,00,000</td>}

                    <td>
                      <span className="badge warning">
                        Low Stock
                      </span>
                    </td>
                  </tr>

                </tbody>

              </table>
            </div>

          </section>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;