import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Products() {
  // Get logged-in user's role
  const role = localStorage.getItem("warehouseiq_role");

  // Check whether the logged-in user is an Admin
  const isAdmin = role === "Admin";

  // Search and category states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  // Product data
  const products = [
    {
      product: "Keyboard",
      sku: "KB001",
      category: "Electronics",
      price: "₹500",
      minimum: 10,
      stock: 8,
      status: "Low Stock",
    },
    {
      product: "Mouse",
      sku: "MS001",
      category: "Accessories",
      price: "₹300",
      minimum: 5,
      stock: 40,
      status: "Healthy",
    },
    {
      product: "Monitor",
      sku: "MN001",
      category: "Electronics",
      price: "₹8,000",
      minimum: 5,
      stock: 15,
      status: "Healthy",
    },
  ];

  // Filter products
  const filteredProducts = products.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item.product.toLowerCase().includes(search) ||
      item.sku.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
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
              <h2>Products</h2>
              <p>
                Manage product records and stock thresholds
              </p>
            </div>

            {/* Add Product */}
            <button className="primary-button">
              + Add Product
            </button>
          </div>

          {/* Products Panel */}
          <div className="panel">

            {/* Search + Category Filter */}
            <div className="toolbar">

              <input
                className="search-input"
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
              >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Accessories</option>
              </select>

            </div>

            {/* Products Table */}
            <div className="table-wrapper">
              <table>

                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Category</th>

                    {/* Price - ADMIN ONLY */}
                    {isAdmin && <th>Price</th>}

                    <th>Min. Stock</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                      <tr key={item.sku}>

                        <td>{item.product}</td>

                        <td>{item.sku}</td>

                        <td>{item.category}</td>

                        {/* Price - ADMIN ONLY */}
                        {isAdmin && (
                          <td>{item.price}</td>
                        )}

                        <td>{item.minimum}</td>

                        <td>{item.stock}</td>

                        <td>
                          <span
                            className={
                              item.status === "Healthy"
                                ? "badge success"
                                : "badge warning"
                            }
                          >
                            {item.status}
                          </span>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={isAdmin ? 7 : 6}
                        style={{
                          textAlign: "center",
                          padding: "30px",
                          color: "#667781",
                        }}
                      >
                        No products found
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

export default Products;