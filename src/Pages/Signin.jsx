import React from 'react';

function Signin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-md bg-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="Enter email" className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Enter password" className="input input-bordered w-full" />
          </div>
          <button className="btn btn-primary w-full">Login</button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account? <a href="/register" className="link text-primary">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
