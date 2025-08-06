import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL, COMPONENT, PAGE_ID } from "../utils/constants";
import { removeUser } from "../store/slices/userSlice";
import { removeFeedData } from "../store/slices/feedSlice";
import { addRequests } from "../store/slices/requestSlice";
import { useEffect } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  const request = useSelector((store) => store?.requests);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        credentials: "include",
        method: "POST",
      });
      if (response.ok) {
        dispatch(removeUser());
        dispatch(removeFeedData());
        navigate(COMPONENT.LOGIN);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return null;
  return (
    <div
      className="navbar bg-base-300 shadow-sm sticky px-6"
      style={{ zIndex: 10 }}
    >
      <div className="flex-1">
        <Link to={COMPONENT.BASE} className="btn btn-ghost text-xl">
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
              className="menu menu-sm dropdown-content bg-base-200 rounded-box mt-3 w-52 p-2 shadow"
              onClick={() => document.activeElement.blur()}
            >
              <li>
                <Link to={COMPONENT.BASE} className="justify-between">
                  Home
                </Link>
              </li>
              <li>
                <Link to={COMPONENT.PROFILE} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to={COMPONENT.CONNECTIONS}>Connections</Link>
              </li>
              <li>
                <Link to={COMPONENT.REQUESTS}>
                  Requests
                  {request?.length > 0 && (
                    <span className="badge">{request?.length}</span>
                  )}
                </Link>
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
