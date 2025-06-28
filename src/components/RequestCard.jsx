import React from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../store/slices/requestSlice";
const RequestCard = ({ request }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, age, gender, about } = request?.fromUserId;
  const handleRequestReview = async (status, id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/request/review/${status}/${id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(removeRequest(id));
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="card sm:px-2 bg-base-300 w-full shadow-sm sm:flex sm:flex-row sm:justify-evenly items-center">
      <figure className="p-1">
        <img
          className="p-1 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full object-cover"
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-2 mx-2">
        <h2 className="card-title capitalize">{`${firstName} ${lastName}`}</h2>
        {age && gender && (
          <p>
            <span>{age}</span>, <span className="capitalize">{gender}</span>
          </p>
        )}
        <p>{about}</p>
      </div>
      <div className="card-actions sm:justify-start justify-evenly gap-6 w-full sm:w-auto p-2 cursor-pointer">
        <div
          className="tooltip border border-gray-400 px-2 rounded-md"
          data-tip="Reject"
          onClick={() => handleRequestReview("rejected", request._id)}
        >
          <XMarkIcon className="size-7 text-red-400" />
        </div>
        <div
          className="tooltip border border-gray-400 px-2 rounded-md"
          data-tip="Accept"
          onClick={() => handleRequestReview("accepted", request._id)}
        >
          <CheckIcon className="size-7 text-green-400" />
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
