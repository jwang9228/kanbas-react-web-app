import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/Kanbas/Account");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="dashboard-margin">
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input
        value={credentials.username}
        className="form-control mb-3"
        onChange={(e) => setCredentials({
          ...credentials,
          username: e.target.value })} />
      <input
        value={credentials.password}
        className="form-control mb-3"
        type="password"
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value })} />
      <button onClick={signup} className="btn default-button focus">
        Signup
      </button>
    </div>
  );
}
export default Signup;