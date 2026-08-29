import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Temporary frontend login credentials
  // Later Person 3 can replace this with Flask API authentication.

  const users = {
    Admin: {
      Admin1: "nani",
      Admin2: "yash",
      Admin3: "venky",
    },

    Employee: {
      employee1: "gnani",
      employee2: "yashas",
      employee3: "venkat",
    },
  };

  // Get usernames according to selected role
  const usernames = Object.keys(users[role]);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;

    setRole(selectedRole);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Check username and password fields
    if (!username || !password) {
      setError("Please select username and enter password.");
      return;
    }

    // Get correct password for selected username and role
    const correctPassword = users[role][username];

    // Check username/password
    if (!correctPassword || password !== correctPassword) {
      setError("Invalid username or password.");
      return;
    }

    // Store login information
    localStorage.setItem("warehouseiq_role", role);
    localStorage.setItem("warehouseiq_user", username);

    // Go to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE - BRANDING */}
      <div className="login-brand">

        <div className="login-logo">W</div>

        <h1>
          Warehouse<span>IQ</span>
        </h1>

        <p>Smart Warehouse & Inventory Management</p>

        <div className="login-decoration">
          Simple. Accurate. Organized.
        </div>

      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="login-form-section">

        <div className="login-card">

          <div className="login-heading">
            <h2>Welcome to WarehouseIQ</h2>
            <p>Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin}>

            {/* ROLE */}
            <label>Role</label>

            <select
              value={role}
              onChange={handleRoleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>


            {/* USERNAME */}
            <label>Username</label>

            <select
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            >
              <option value="">
                Select username
              </option>

              {usernames.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>


            {/* PASSWORD */}
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />


            {/* ERROR */}
            {error && (
              <p className="form-error">
                {error}
              </p>
            )}


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="primary-button login-button"
            >
              Sign In
            </button>

          </form>

          <p className="login-note">
            Warehouse inventory management system
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;