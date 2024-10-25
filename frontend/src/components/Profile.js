import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { state } = useAuth();
  const user = state.user;

  return (
    <div>
      <h3>Profile Information</h3>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
  );
};

export default Profile;
