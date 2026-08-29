import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Suppliers() {
  // Get logged-in user's role
  const role = localStorage.getItem("warehouseiq_role");

  // Check if the user is an Admin
  const isAdmin = role === "Admin";

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Supplier data
  const suppliers = [
    {
      supplier: "Tech Supplies Co.",
      contact: "9876543210",
      email: "contact@techsupplies.com",
      products: "Keyboard, Mouse",
    },
    {
      supplier: "Global Traders",
      contact: "9123456780",
      email: "info@globaltraders.com",
      products: "Monitor, Printer",
    },
  ];

  // Search suppliers
  const filteredSuppliers = suppliers.filter((item) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      item.supplier.toLowerCase().includes(search) ||
      item.products.toLowerCase().includes(search)
    );
  });

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">

          {/* Page Header */}
          <div className="page-header">
            <div>
              <h2>Suppliers</h2>
              <p>
                Manage supplier details and products supplied
              </p>
            </div>

            <button className="primary-button">
              + Add Supplier
            </button>
          </div>

          {/* Suppliers Panel */}
          <div className="panel">

            {/* Search Bar */}
            <div className="toolbar">
              <input
                className="search-input"
                type="text"
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>

            {/* Supplier Table */}
            <div className="table-wrapper">
              <table>

                <thead>
                  <tr>
                    <th>Supplier</th>

                    {/* Admin Only */}
                    {isAdmin && <th>Contact</th>}

                    {/* Admin Only */}
                    {isAdmin && <th>Email</th>}

                    <th>Products Supplied</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map((item) => (
                      <tr key={item.supplier}>

                        <td>{item.supplier}</td>

                        {/* Contact - Admin Only */}
                        {isAdmin && (
                          <td>{item.contact}</td>
                        )}

                        {/* Email - Admin Only */}
                        {isAdmin && (
                          <td>{item.email}</td>
                        )}

                        <td>{item.products}</td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={isAdmin ? 4 : 2}
                        style={{
                          textAlign: "center",
                          padding: "30px",
                          color: "#667781",
                        }}
                      >
                        No suppliers found
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Suppliers;