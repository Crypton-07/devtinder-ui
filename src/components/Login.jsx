import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../store/slices/userSlice";
import { BASE_URL, PAGE_ID } from "../utils/constants";

const Login = () => {
  const [clientHeight, setClientHeight] = useState(0);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      dispatch(addUser(data));
      if (response.status === 200) {
        navigate(PAGE_ID.BASE);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const clientHeight = document.querySelector("#login-card").clientHeight;
    setClientHeight(Math.floor(clientHeight / 3));
    return () => {
      setClientHeight(0);
    };
  }, []);

  return (
    <div
      id="login-card"
      className="flex justify-center items-center transition-all ease-in duration-300"
      style={{
        margin: `${clientHeight}px 0`,
      }}
    >
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <div className="flex flex-col gap-2 w-full">
            <fieldset className="fieldset">
              <legend className="fieldset-legend tracking-wider">Email</legend>
              <input
                ref={emailRef}
                type="email"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend tracking-wider">
                Password
              </legend>
              <input
                ref={passwordRef}
                type="password"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center my-5">
            <button
              onClick={handleLogin}
              className="btn btn-primary px-10 text-base"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
