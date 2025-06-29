import React, { useState, useSyncExternalStore } from "react";
import { api } from "../api/axiosInstance";

function Signup() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")
  const [role,setRole]=useState("")
  const [error,setError]=useState("")
  const handleSignup=async()=>{
    if(!email||!password||!name||!role){
      setError("Please enter all the fileds !")
      return error
    }
    try {
      const res= await api.post('auth/signup',
      {name,email,password,role}

    )
      
      alert(`Signup Successfull : ${res.data.msg}`)
    } 
    
    catch (error) {
      
      alert("Signup failed: " + (error.response?.data?.msg || error.msg));

    }
    

  }



  
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-md bg-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault(); 
            handleSignup(); 
          }}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Role</span>
            </label>
            <select
              className="select select-bordered"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">-- Select --</option>
              
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/signin" className="link text-primary">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
