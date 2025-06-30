import React, { useState } from "react";
import { api } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/users/userSlice";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await api.post("/auth/signin", { email, password });
      console.log("Response from server:", res);

      const { token, user, msg } = res.data;

      // Save to Redux store and localStorage
      dispatch(loginSuccess({ token, user }));
      console.log('final usr after login ',user)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert(msg);

      // Redirect based on role
      if (user.role === "manager" || user.role === "admin") {
        navigate("/manager/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.log(error.response);
      const errMsg =
        error.response?.data?.msg || "Login failed. Please check credentials.";
      setError(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-md bg-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSignin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-full">Login</button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/Signup" className="link text-primary">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
