import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  const { users, getManagers } = props;
  const managers = getManagers();
  return (
    <div>
      <Link to="/users">
        <div>Users {users.length}</div>
      </Link>
      <Link to="/managers">
        <div>Managers {managers.length}</div>
      </Link>
      <Link to="/users/create">Create User</Link>
    </div>
  );
};

export default NavBar;
