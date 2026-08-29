import {
  Boxes,
  LockKeyhole,
  PackageCheck,
  IndianRupee,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

function Inventory() {
  // Get the logged-in user's role
  const role = localStorage.getItem("warehouseiq_role");

  // Only Admin can see Stock Value
  const isAdmin = role === "Admin";

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h2>Inventory</h2>
              <p>Monitor stock levels and inventory value</p>
            </div>
          </div>

          <section className="stats-grid">
            <StatCard
              title="Total Stock"
              value="2,450"
              description="All warehouses"
              icon={Boxes}
              type="navy"
            />

            <StatCard
              title="Reserved Stock"
              value="300"
              description="Currently reserved"
              icon={LockKeyhole}
              type="gold"
            />

            <StatCard
              title="Available Stock"
              value="2,150"
              description="Ready for use"
              icon={PackageCheck}
              type="teal"
            />

            {/* Stock Value - ADMIN ONLY */}
            {isAdmin && (
              <StatCard
                title="Stock Value"
                value="₹5,40,000"
                description="Estimated value"
                icon={IndianRupee}
                type="green"
              />
            )}
          </section>

          <div className="panel">
            <div className="panel-header">
              <h3>Inventory Details</h3>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Total</th>
                    <th>Reserved</th>
                    <th>Available</th>

                    {/* Stock Value - ADMIN ONLY */}
                    {isAdmin && <th>Stock Value</th>}
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
                  </tr>

                  <tr>
                    <td>Mouse</td>
                    <td>200</td>
                    <td>30</td>
                    <td>170</td>

                    {/* Stock Value - ADMIN ONLY */}
                    {isAdmin && <td>₹60,000</td>}
                  </tr>

                  <tr>
                    <td>Monitor</td>
                    <td>50</td>
                    <td>5</td>
                    <td>45</td>

                    {/* Stock Value - ADMIN ONLY */}
                    {isAdmin && <td>₹4,00,000</td>}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Inventory;