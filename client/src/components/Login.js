import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault(); // Prevent page refresh when submitting
    try {
      const body = { email, password };
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      let parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token); // Save to localStorage
        setAuth(true);
        toast.success("Login Successful!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <h1 className="text-center my-5">Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">Register</Link>
    </>
  );
}

export default Login;
