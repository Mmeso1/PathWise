"use client";

import React, { useEffect, useState } from "react";

export const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
  });

  // Populate profile from sessionStorage
  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      name: sessionStorage.getItem("username") || "",
      email: sessionStorage.getItem("email") || "",
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Optional: persist any edits
    sessionStorage.setItem("username", profile.name);
    sessionStorage.setItem("email", profile.email);

    console.log(profile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
