import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {
  const username =
    localStorage.getItem("warehouseiq_user") || "Admin1";

  const role =
    localStorage.getItem("warehouseiq_role") || "Admin";

  const users = {
    Admin1: {
      name: "Nani",
      role: "Administrator",
      access: "Full Access",
    },

    Admin2: {
      name: "Yash",
      role: "Administrator",
      access: "Full Access",
    },

    Admin3: {
      name: "Venky",
      role: "Administrator",
      access: "Full Access",
    },

    employee1: {
      name: "Gnani",
      role: "Employee",
      access: "Standard Access",
    },

    employee2: {
      name: "Yashas",
      role: "Employee",
      access: "Standard Access",
    },

    employee3: {
      name: "Venkat",
      role: "Employee",
      access: "Standard Access",
    },
  };

  const currentUser = users[username] || {
    name: username,
    role: role === "Admin" ? "Administrator" : "Employee",
    access:
      role === "Admin"
        ? "Full Access"
        : "Standard Access",
  };

  const isAdmin = role === "Admin";

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f7f8",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Navbar />

        <main
          style={{
            padding: "24px 30px",
          }}
        >
          {/* =========================
              PAGE HEADER
          ========================= */}

          <div
            style={{
              marginBottom: "18px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#0b4054",
                fontSize: "26px",
                fontWeight: "700",
              }}
            >
              My Profile
            </h2>

            <p
              style={{
                marginTop: "5px",
                marginBottom: 0,
                color: "#667781",
                fontSize: "14px",
              }}
            >
              View your WarehouseIQ account information
            </p>
          </div>

          {/* =========================
              MAIN PROFILE CARD
          ========================= */}

          <div
            style={{
              maxWidth: "900px",
              background: "#ffffff",
              border: "1px solid #dce4e7",
              borderRadius: "12px",
              boxShadow:
                "0 4px 14px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {/* =========================
                PROFILE HEADER
            ========================= */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "20px 24px",
                borderBottom:
                  "1px solid #e5eaec",
              }}
            >
              {/* AVATAR */}

              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#438596",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "700",
                  flexShrink: 0,
                }}
              >
                {currentUser.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              {/* USER DETAILS */}

              <div>
                <h3
                  style={{
                    margin: 0,
                    color: "#0b4054",
                    fontSize: "22px",
                    fontWeight: "700",
                  }}
                >
                  {currentUser.name}
                </h3>

                <p
                  style={{
                    margin: "3px 0 7px",
                    color: "#71808a",
                    fontSize: "13px",
                  }}
                >
                  @{username}
                </p>

                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    background: isAdmin
                      ? "#e4f5ee"
                      : "#fff3d2",
                    color: isAdmin
                      ? "#28745e"
                      : "#80651c",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {currentUser.role}
                </span>
              </div>
            </div>

            {/* =========================
                ACCOUNT INFORMATION
            ========================= */}

            <div
              style={{
                padding: "20px 24px",
                borderBottom:
                  "1px solid #e5eaec",
              }}
            >
              <h3
                style={{
                  margin: "0 0 14px",
                  color: "#0b4054",
                  fontSize: "17px",
                  fontWeight: "700",
                }}
              >
                Account Information
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: "10px",
                }}
              >
                {/* FULL NAME */}

                <div
                  style={{
                    padding: "13px 15px",
                    background: "#f7f9fa",
                    border:
                      "1px solid #e2e8ea",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      color: "#78868d",
                      fontSize: "10px",
                      fontWeight: "700",
                      marginBottom: "5px",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        "0.4px",
                    }}
                  >
                    Full Name
                  </div>

                  <div
                    style={{
                      color: "#173d4d",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {currentUser.name}
                  </div>
                </div>

                {/* USERNAME */}

                <div
                  style={{
                    padding: "13px 15px",
                    background: "#f7f9fa",
                    border:
                      "1px solid #e2e8ea",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      color: "#78868d",
                      fontSize: "10px",
                      fontWeight: "700",
                      marginBottom: "5px",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        "0.4px",
                    }}
                  >
                    Username
                  </div>

                  <div
                    style={{
                      color: "#173d4d",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {username}
                  </div>
                </div>

                {/* ROLE */}

                <div
                  style={{
                    padding: "13px 15px",
                    background: "#f7f9fa",
                    border:
                      "1px solid #e2e8ea",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      color: "#78868d",
                      fontSize: "10px",
                      fontWeight: "700",
                      marginBottom: "5px",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        "0.4px",
                    }}
                  >
                    Role
                  </div>

                  <div
                    style={{
                      color: "#173d4d",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {currentUser.role}
                  </div>
                </div>

                {/* ACCESS LEVEL */}

                <div
                  style={{
                    padding: "13px 15px",
                    background: "#f7f9fa",
                    border:
                      "1px solid #e2e8ea",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      color: "#78868d",
                      fontSize: "10px",
                      fontWeight: "700",
                      marginBottom: "5px",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        "0.4px",
                    }}
                  >
                    Access Level
                  </div>

                  <div
                    style={{
                      color: "#173d4d",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {currentUser.access}
                  </div>
                </div>
              </div>
            </div>

            {/* =========================
                ACCOUNT STATUS
            ========================= */}

            <div
              style={{
                padding: "20px 24px",
                borderBottom:
                  "1px solid #e5eaec",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  color: "#0b4054",
                  fontSize: "17px",
                  fontWeight: "700",
                }}
              >
                Account Status
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  padding: "13px 15px",
                  background: "#f1faf6",
                  border:
                    "1px solid #d8eee4",
                  borderRadius: "8px",
                }}
              >
                {/* STATUS DOT */}

                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#3b9b72",
                    flexShrink: 0,
                  }}
                />

                <div>
                  <div
                    style={{
                      color: "#28745e",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    Active Account
                  </div>

                  <div
                    style={{
                      marginTop: "3px",
                      color: "#68777e",
                      fontSize: "12px",
                    }}
                  >
                    Your WarehouseIQ
                    account is active
                    and ready to use.
                  </div>
                </div>
              </div>
            </div>

            {/* =========================
                SYSTEM ACCESS
            ========================= */}

            <div
              style={{
                padding: "20px 24px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  color: "#0b4054",
                  fontSize: "17px",
                  fontWeight: "700",
                }}
              >
                System Access
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "13px 15px",
                  background: "#f7f9fa",
                  border:
                    "1px solid #e2e8ea",
                  borderRadius: "8px",
                }}
              >
                {/* ACCESS ICON */}

                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: "#0b4054",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "16px",
                    flexShrink: 0,
                  }}
                >
                  {isAdmin ? "A" : "E"}
                </div>

                <div>
                  <div
                    style={{
                      color: "#173d4d",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    {isAdmin
                      ? "Administrator Access"
                      : "Employee Access"}
                  </div>

                  <div
                    style={{
                      marginTop: "3px",
                      color: "#68777e",
                      fontSize: "12px",
                      lineHeight: "1.4",
                    }}
                  >
                    {isAdmin
                      ? "You have access to all warehouse management features."
                      : "You have access to the warehouse operations available to employees."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;