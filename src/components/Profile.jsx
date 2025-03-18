import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="p-2 md:p-0 overflow-y-scroll h-fit flex items-center justify-center">
      {user && <EditProfile user={user} />}
    </div>
  );
};

export default Profile;
