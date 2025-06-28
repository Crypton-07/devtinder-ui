import React, { useEffect } from "react";
import { BASE_URL, PAGE_ID } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/slices/connectionSlice";
import UserCard from "./UserCard";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${PAGE_ID.CONNECTIONS}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const { data } = await response.json();
        dispatch(addConnection(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    !connections && fetchConnections();
  }, []);
  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-4 mb-[12vh]">
      {connections?.map((connection) => (
        <div className="w-1/2" key={connection._id}>
          <ConnectionCard user={connection} />
        </div>
      ))}
    </div>
  );
};

export default Connections;
