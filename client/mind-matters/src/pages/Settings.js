import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Button } from 'flowbite-react';

const Settings = () => {
  const { currentUser, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container max-w-[1280px] px-6 mx-auto mt-5 text-gray-600">
      <h3 className="text-lg font-semibold mb-4">Settings</h3>
      <div className="flex flex-col gap-4">
        <div className="bg-gray-200 p-4 rounded">
          <h4 className="text-md font-semibold">Account Settings</h4>
          <p>Manage your account information and preferences.</p>
        </div>
        <div className="bg-gray-200 p-4 rounded">
          <h4 className="text-md font-semibold">Notifications</h4>
          <p>Adjust your notification preferences.</p>
        </div>
        <div className="bg-gray-200 p-4 rounded">
          <h4 className="text-md font-semibold">Privacy</h4>
          <p>Review and modify your privacy settings.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
