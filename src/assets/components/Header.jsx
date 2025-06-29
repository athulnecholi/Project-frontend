import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/users/userSlice";

const Header = () => {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <header className="bg-primary text-black p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">
        Turf Booking
      </Link>

      <nav className="space-x-4">
        <Link to="/turfs">Browse Turfs</Link>

        {!token ? (
          <>
            <Link to="/signin">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : user?.role === "user" ? (
          <>
            <Link to="/user/dashboard">Dashboard</Link>
            <Link to="/user/bookings">My Bookings</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : user?.role === "manager" || user?.role === "admin" ? (
          <>
            <Link to="/manager/dashboard">Dashboard</Link>
            <Link to="/manager/createturf">Create Turf</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
