import { useEffect, useRef, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function StockOut() {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const customReasonRef = useRef(null);

  // Automatically focus the custom reason box
  // when "Other" is selected
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

          {/* Page Header */}
          <div className="page-header">
            <div>
              <h2>Stock OUT</h2>
              <p>Record outgoing inventory</p>
            </div>
          </div>


          {/* Stock OUT Form */}
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

                // Clear custom reason when another
                // option is selected
                if (selectedReason !== "Other") {
                  setCustomReason("");
                }
              }}
            >
              <option value="">
                Select reason
              </option>

              <option value="Dispatch">
                Dispatch
              </option>

              <option value="Sale">
                Sale
              </option>

              <option value="Damaged">
                Damaged
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
                Stock OUT
              </button>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default StockOut;