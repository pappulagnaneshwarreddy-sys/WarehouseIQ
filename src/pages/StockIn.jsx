import { useEffect, useRef, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function StockIn() {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const customReasonRef = useRef(null);

  // Automatically focus the text box when "Other" is selected
  useEffect(() => {
    if (reason === "Other") {
      setTimeout(() => {
        customReasonRef.current?.focus();
      }, 0);
    }
  }, [reason]);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h2>Stock IN</h2>
              <p>Record incoming inventory</p>
            </div>
          </div>

          <div className="form-panel">

            {/* Product */}
            <label>Product</label>

            <select defaultValue="">
              <option value="" disabled>
                Select product
              </option>

              <option value="Keyboard">
                Keyboard
              </option>

              <option value="Mouse">
                Mouse
              </option>

              <option value="Monitor">
                Monitor
              </option>
            </select>


            {/* Quantity */}
            <label>Quantity</label>

            <input
              type="number"
              placeholder="Enter quantity"
              min="1"
            />


            {/* Reason */}
            <label>Reason</label>

            <select
              value={reason}
              onChange={(e) => {
                const selectedReason = e.target.value;

                setReason(selectedReason);

                if (selectedReason !== "Other") {
                  setCustomReason("");
                }
              }}
            >
              <option value="">
                Select reason
              </option>

              <option value="Received from supplier">
                Received from supplier
              </option>

              <option value="Purchase">
                Purchase
              </option>

              <option value="Return">
                Return
              </option>

              <option value="Other">
                Other
              </option>
            </select>


            {/* Custom Reason */}
            {reason === "Other" && (
              <input
                ref={customReasonRef}
                className="custom-reason-input"
                type="text"
                placeholder="Enter reason"
                value={customReason}
                onChange={(e) => {
                  setCustomReason(e.target.value);
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
              />
            )}


            {/* Buttons */}
            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-button"
              >
                Stock IN
              </button>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default StockIn;