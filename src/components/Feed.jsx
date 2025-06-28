import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { setFeedData } from "../store/slices/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

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
  useEffect(() => {
    fetchFeed();
    return () => {};
  }, []);

  return (
    <div className="flex flex-col gap-10 justify-center items-center mt-4 mb-[12vh]">
      {feedData
        ? feedData.map((data) => <UserCard key={data._id} user={data} />)
        : null}
    </div>
  );
};

export default Feed;
