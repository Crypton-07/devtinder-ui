import React, { useEffect } from "react";
import { BASE_URL, PAGE_ID } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../store/slices/requestSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const getConnectionRequests = useSelector((store) => store.requests);
  const fetchConnectionRequests = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${PAGE_ID.REQUESTS}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const { data } = await response.json();
        dispatch(addRequests(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnectionRequests();
  }, []);
  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-4 mb-[12vh]">
      {getConnectionRequests?.map((request) => (
        <div className="w-[50%]" key={request?._id}>
          <RequestCard request={request} />
        </div>
      ))}
    </div>
  );
};

export default Requests;
