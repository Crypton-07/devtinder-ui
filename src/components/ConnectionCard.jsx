import React from "react";

const ConnectionCard = ({ user }) => {
  const { firstName, lastName, age, gender, about } = user;
  return (
    <div className="card bg-base-300 w-full shadow-sm flex flex-row">
      <figure>
        <img
          className="p-2 w-[100px] h-[100px] rounded-full object-cover"
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
        {/* <div className="card-actions justify-between my-4">
          <button className="btn btn-error">Ignore</button>
          <button className="btn btn-success">Interested</button>
        </div> */}
      </div>
    </div>
  );
};

export default ConnectionCard;
