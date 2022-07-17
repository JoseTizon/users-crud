import React from "react";

const UsersList = ({ users, selectUser, deleteUser }) => {
  return (
    <div className="cards-container">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <p>
            <b>Email: </b>
            {user.email}
          </p>
          <p>
            <b>Birthday: </b>
            {user.birthday}
          </p>
          <button onClick={() => selectUser(user)} className="btn-edit"><i className="fa-solid fa-pen"></i></button>
          <button onClick={() => deleteUser(user.id)} className="btn-delete"><i className="fa-solid fa-trash-can"></i></button>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
