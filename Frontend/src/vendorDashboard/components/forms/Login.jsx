import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Login = ({ShowWelcomeHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        if (data.token) {
          alert("Login successful");
          localStorage.setItem("loginToken", data.token);
          setEmail("");
          setPassword("");
          ShowWelcomeHandler();
        } else {
          setError("Token not provided in response");
        }
      } else {
        setError(data.message || "Login failed"); // Use the server-provided error message if available, otherwise a generic message
      }
      const  vendorId = data.vendorId
      const vendorResponse = await  fetch(`http://localhost:4000/vendor/single-vendor/${vendorId}`)
      const vendorData  =await vendorResponse.json()
      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        console.log('firmaname fetched',vendorFirmName)
        console.log(vendorFirmId)
        localStorage.setItem(
          'firmId',vendorFirmId
        )
        localStorage.setItem('FirmName',vendorFirmName)

        window.location.reload()
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during login.");
    }
  };
  

  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); // Clear any previous errors when user starts typing
          }}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(""); // Clear any previous errors when user starts typing
          }}
        />{" "}
        <br />
        {error && <div className="error">{error}</div>}
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
     
    </div>
  );
};

export default Login;
