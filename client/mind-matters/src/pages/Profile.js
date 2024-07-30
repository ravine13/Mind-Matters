import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { currentUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      fetch(`/api/user/${currentUser.id}`)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [currentUser]);

  const handleUpdate = (event) => {
    event.preventDefault();
    fetch(`/api/user/${currentUser.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error updating user data:', error));
  };

  const handleDelete = () => {
    fetch(`/api/user/${currentUser.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Handle user logout or redirection after deletion
        navigate('/signup');
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Username:
          <input
            type="text"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
}
