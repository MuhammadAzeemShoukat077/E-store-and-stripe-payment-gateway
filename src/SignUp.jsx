import React, {useState} from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");     
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:3001/auth/signUp",
          {
            name,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

          console.log("Signup response:", response.data);
          console.log('abvd')
        setSuccessMessage("Signup successful! Redirecting to login...");
        // setTimeout(() => {
        //   navigate("/login");
          // }, 2000); 
          navigate("/login");
      } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
        setError(
          error.response?.data.message || "An error occurred during signup."
        );
      }
    };



  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 ">
      <div style={{ minWidth: "400px" }} className="bg-white">
        <form>
          <h3 className="text-center">SignUp</h3>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
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
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
          {successMessage && (
            <p className="text-success mt-2">{successMessage}</p>
          )}
          <p className="text and mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp