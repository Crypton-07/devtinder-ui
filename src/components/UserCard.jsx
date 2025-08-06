import { useDispatch } from "react-redux";
import { BASE_URL, STATUS } from "../utils/constants";
import { removeUserFromFeed } from "../store/slices/feedSlice";
import { useEffect, useState } from "react";

const UserCard = ({ hideButtonProfile = false, user }) => {
  const { _id, firstName, lastName, email, age, gender, about, skills } = user;
  const dispatch = useDispatch();
  const handleRequestSend = async (status) => {
    try {
      const response = await fetch(
        `${BASE_URL}/request/send/${status}/${user._id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(removeUserFromFeed(_id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-300 w-[450px] h-[550px] shadow-sm">
      <figure>
        <img
          className="w-auto h-[450px] object-cover"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt="Human"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title capitalize">{`${firstName} ${lastName}`}</h2>
        <p>
          <span>{age}</span>, <span className="capitalize">{gender}</span>
        </p>
        <p>{about}</p>
        {!hideButtonProfile && (
          <div className="card-actions justify-between my-4">
            <button
              className="btn btn-error"
              onClick={() => handleRequestSend("ignored")}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleRequestSend("interested")}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
