import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    // let token;
    //console.log("hello")
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const receivedToken = response.data;

      // Save the token in local storage
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
      setError("");
      console.log("Login response:", response.data);
      navigate("/shop");
    } catch (error) {
      setError(
        error.response?.data.message || "An error occurred during login."
      );
      console.error("Login Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center  vh-100 ">
      <div style={{ minWidth: "400px" }} className="bg-white">
        <form>
          <h3 className="text-center">Login</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="Check1"
            />
            <label htmlFor="Check1" className="custom-input-label ms-2">
              Remember me
            </label>
          </div>
          <div className="d-grid">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
          <p className="text and mt-2">
            Don't have an account? <Link to="/">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
