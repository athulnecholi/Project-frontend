import React, { useState } from 'react';
import {api} from '../api/axiosInstance'

const EditProfilePic = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const res = await api.put('users/user/profile-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setMessage('Profile picture updated!');
    } catch (err) {
      setMessage('Failed to update picture');
    }
  };

  return (
    <div className="p-4">
      <h2>Edit Profile Picture</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="my-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
};

export default EditProfilePic;