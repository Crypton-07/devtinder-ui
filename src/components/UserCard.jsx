/* eslint-disable no-unused-vars */
const UserCard = ({ hideButtonProfile = false, user }) => {
  const { firstName, lastName, email, age, gender, about, skills } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
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
            <button className="btn btn-error">Ignore</button>
            <button className="btn btn-success">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
