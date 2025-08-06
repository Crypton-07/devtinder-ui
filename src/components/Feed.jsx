import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, PAGE_ID } from "../utils/constants";
import { setFeedData } from "../store/slices/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { addRequests } from "../store/slices/requestSlice";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const fetchFeed = async () => {
    if (feedData) return;
    try {
      const res = await fetch(`${BASE_URL}/feed`, { credentials: "include" });
      const { data } = await res.json();
      dispatch(setFeedData(data));
    } catch (error) {
      console.log(error);
    }
  };

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
    fetchFeed();
    fetchConnectionRequests();
    return () => {};
  }, []);

  if (!feedData?.length)
    return (
      <p className="text-2xl text-center my-4 font-medium tracking-wide">
        No user found
      </p>
    );

  return (
    <div className="flex h-[82vh] justify-center items-center">
      {feedData && feedData.length > 0 && <UserCard user={feedData[0]} />}
    </div>
  );
};

export default Feed;
