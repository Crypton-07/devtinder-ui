import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL, PAGE_ID } from "../utils/constants";
import { removeUser } from "../store/slices/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        credentials: "include",
        method: "POST",
      });
      if (response.ok) {
        dispatch(removeUser());
        navigate(PAGE_ID.LOGIN);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm sticky px-6">
      <div className="flex-1">
        <Link to={PAGE_ID.BASE} className="btn btn-ghost text-xl">
          🧑🏼‍💻DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <p className="capitalize hidden sm:block">{`Welcome, ${user.firstName}`}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={PAGE_ID.PROFILE} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link>Settings</Link>
              </li>
              <li>
                <Link onClick={() => handleLogout()}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
