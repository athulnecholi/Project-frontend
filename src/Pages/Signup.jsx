import React from "react";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-md bg-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="space-y-10">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
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
              placeholder="Create password"
              className="input input-bordered w-full"
            />
          </div>

          <div className="dropdown dropdown-bottom">
            <div tabIndex={2} role="button" className="btn m-1">
              Roles
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a>Admin</a>
              </li>
              <li>
                <a>Manager</a>
              </li>
              <li>
                <a>User</a>
              </li>
            </ul>
          </div>

          <button className="btn btn-primary w-full">Register</button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="link text-primary">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
