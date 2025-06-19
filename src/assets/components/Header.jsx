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
      <Link to="/" className="font-bold text-xl">Turf Booking</Link>
      <nav className="space-x-4">
        <Link to="/turfs">Browse Turfs</Link>

        {!token ? (
          <>
            <Link to="/signin">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/user/dashboard">Dashboard</Link>
            <Link to="/my-bookings">My Bookings</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
