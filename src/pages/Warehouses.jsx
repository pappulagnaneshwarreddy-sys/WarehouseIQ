import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Warehouses() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h2>Warehouses</h2>
              <p>Manage warehouse locations, bins and capacity</p>
            </div>

            <button className="primary-button">
              + Add Warehouse
            </button>
          </div>

          <div className="panel">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Warehouse</th>
                    <th>Location</th>
                    <th>Bin</th>
                    <th>Capacity</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Main Warehouse</td>
                    <td>Vijayawada</td>
                    <td>A-101</td>
                    <td>5,000 units</td>
                  </tr>

                  <tr>
                    <td>Secondary Warehouse</td>
                    <td>Guntur</td>
                    <td>B-202</td>
                    <td>3,000 units</td>
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

export default Warehouses;