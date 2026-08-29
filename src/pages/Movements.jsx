import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Movements() {
  // Movement data
  // User information has been completely removed.
  const movements = [
    ["18 Aug 2026", "Keyboard", "IN", "+20", "Purchase"],
    ["18 Aug 2026", "Mouse", "OUT", "-5", "Dispatch"],
    ["17 Aug 2026", "Monitor", "IN", "+10", "Purchase"],
    ["17 Aug 2026", "Printer", "OUT", "-2", "Dispatch"],
  ];

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Type filter state
  const [selectedType, setSelectedType] = useState("All Types");

  // Filter movements
  const filteredMovements = movements.filter((movement) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      movement[0].toLowerCase().includes(search) ||
      movement[1].toLowerCase().includes(search) ||
      movement[2].toLowerCase().includes(search) ||
      movement[3].toLowerCase().includes(search) ||
      movement[4].toLowerCase().includes(search);

    const matchesType =
      selectedType === "All Types" ||
      movement[2] === selectedType;

    return matchesSearch && matchesType;
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
              <h2>Movement History</h2>
              <p>Track every inventory movement</p>
            </div>
          </div>


          <div className="panel">

            {/* Search and Filter */}
            <div className="toolbar">

              <input
                className="search-input"
                type="text"
                placeholder="Search movements..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value)
                }
              >
                <option>All Types</option>
                <option>IN</option>
                <option>OUT</option>
              </select>

            </div>


            {/* Movement Table */}
            <div className="table-wrapper">
              <table>

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Reason</th>
                  </tr>
                </thead>


                <tbody>
                  {filteredMovements.length > 0 ? (
                    filteredMovements.map(
                      (movement, index) => (
                        <tr key={index}>

                          <td>{movement[0]}</td>

                          <td>{movement[1]}</td>

                          <td>
                            <span
                              className={
                                movement[2] === "IN"
                                  ? "badge success"
                                  : "badge danger"
                              }
                            >
                              {movement[2]}
                            </span>
                          </td>

                          <td>{movement[3]}</td>

                          <td>{movement[4]}</td>

                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          textAlign: "center",
                          padding: "30px",
                          color: "#667781",
                        }}
                      >
                        No movements found
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

export default Movements;