import React from 'react';
import { Link } from 'react-router-dom';
const Users = props => {
  const { users, findManager, deleteUser } = props;
  
  return (
    <div>
      {users.map(function(user) {
        if (user.managerId) {
          return (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>
                {user.name} managed by {findManager(user).name}
              </Link>
              <button onClick={() => deleteUser(user.id)}>X</button>
            </li> 
            
          );
        } else {
          return (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>
              {user.name}
            </Link>
          <button onClick={() => deleteUser(user.id)}>X</button>
          </li>
          )
        }
      })}
    </div>
  );
};

export default Users;
