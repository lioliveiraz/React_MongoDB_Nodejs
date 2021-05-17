import React from "react";
import { Link } from "react-router-dom";

function Cards({ developer }) {
  const { avatar, name, email, _id } = developer;
  return (
    <Link to={`/developers/${_id}`}>
      <div>
        <img src={avatar} alt={name} />
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </Link>
  );
}

export default Cards;
