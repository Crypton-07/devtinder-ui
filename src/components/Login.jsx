import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../store/slices/userSlice";
import { BASE_URL, PAGE_ID } from "../utils/constants";

const Login = () => {
  const [clientHeight, setClientHeight] = useState(0);
  const [isLoginForm, setIsLoginForm] = useState(false);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const [error, setError] = useState("");

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
      if (response.ok && response.status === 200) {
        dispatch(addUser(data));
        navigate(PAGE_ID.BASE);
      } else {
        setError(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignUp = async () => {
    try {
      const payload = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const { data } = await response.json();
        dispatch(addUser(data));
        navigate(PAGE_ID.PROFILE);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const clientHeight = document.querySelector("#login-card").clientHeight;
    setClientHeight(Math.floor(clientHeight / 4));
    if (userData) {
      navigate(PAGE_ID.BASE);
    }
    return () => {
      setClientHeight(0);
      setError("");
    };
  }, [navigate, userData]);

  return (
    <div
      id="login-card"
      className="flex justify-center items-center transition-all ease-in duration-300"
      style={{
        margin: `${isLoginForm ? "14px 0" : `${clientHeight}px 0`}`,
      }}
    >
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">
            {isLoginForm ? "Sign Up" : "Log In"}
          </h2>
          <div className="flex flex-col gap-2 w-full">
            {isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend tracking-wider">
                    First Name
                  </legend>
                  <input
                    ref={firstNameRef}
                    type="text"
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend tracking-wider">
                    Last Name
                  </legend>
                  <input
                    ref={lastNameRef}
                    type="text"
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend tracking-wider">Email</legend>
              <input
                ref={emailRef}
                type="email"
                className="input w-full"
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
                className="input w-full"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <p className="text-red-400">{error}</p>
          <div className="card-actions justify-center my-5">
            <button
              onClick={!isLoginForm ? handleLogin : handleSignUp}
              className="btn btn-primary w-full text-base"
            >
              {!isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <div className="my-2 text-center">
            <p>
              {!isLoginForm ? "Not signed in ?" : "Already Signed Up ?"}{" "}
              <button
                className="text-blue-500"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? "Login" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
