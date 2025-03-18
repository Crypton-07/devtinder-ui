import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import { Footer } from "./Footer";
import { BASE_URL, ERROR, PAGE_ID } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/slices/userSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/profile/view`, {
        credentials: "include",
      });
      if (!response.ok) {
        if (response.status === 401) {
          navigate(PAGE_ID.LOGIN);
        }
        if (response.status === 400) {
          const data = await response.json();
          if (data.name === ERROR.TOKEN_EXPIRED) {
            navigate(PAGE_ID.LOGIN);
          }
        }
      } else {
        const { data } = await response.json();
        dispatch(addUser(data));
      }
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);
  return (
    <div className="">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomePage;
