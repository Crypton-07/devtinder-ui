import React, { useRef, useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL, PAGE_ID } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const firstName = useRef(null);
  const lastName = useRef(null);
  const age = useRef(null);
  const gender = useRef(null);
  const about = useRef(null);
  const skills = useRef(null);
  const [errors, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const saveProfile = async () => {
    const payLoad = {
      firstName: firstName?.current?.value,
      lastName: lastName?.current?.value,
      age: age?.current?.value,
      gender: gender?.current?.value,
      about: about?.current?.value,
      skills: skills?.current?.value.split(/\s*,\s*/),
    };
    try {
      const response = await fetch(`${BASE_URL}/${PAGE_ID.EDIT_PROFILE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payLoad),
        credentials: "include",
      });
      if (response.ok) {
        const { data } = await response.json();
        dispatch(addUser(data));
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setError(await response.json());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-start gap-4">
      <div className="flex justify-center items-center my-2">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl">Edit Profile</h2>
            <div className="flex flex-col gap-1 w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  ref={firstName}
                  defaultValue={user?.firstName}
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  ref={lastName}
                  defaultValue={user?.lastName}
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                />
              </fieldset>
              <div className="flex justify-between gap-10">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    ref={age}
                    defaultValue={user?.age}
                    type="text"
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Gender</legend>
                  <select
                    ref={gender}
                    defaultValue={user?.gender}
                    className="select w-full"
                  >
                    {/* <option disabled={true}>{user.gender}</option> */}
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </fieldset>
              </div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  ref={about}
                  defaultValue={user?.about}
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Skills</legend>
                <input
                  ref={skills}
                  defaultValue={user?.skills}
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                />
              </fieldset>
            </div>
            {/* <p className="text-red-400">{error}</p> */}
            <div className="card-actions justify-center my-5">
              <button
                className="btn btn-primary px-10 text-base"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
            {errors && <p className="text-red-400">{errors}</p>}
          </div>
        </div>
      </div>
      <UserCard hideButtonProfile={true} user={user} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
