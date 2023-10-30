import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import { getProfile } from "../Managers/ProfileManager";

export const ProfilePage = () => {

    const [profile, setProfile] = useState([]);
  

    const Profile = () =>{
        getProfile().then(setProfile);
    }

    useEffect(() => {

       Profile();

    }, []);

  return (
    <>

    <div>
      {profile.filter((p) => p.firstName === "caden")
      .map((p) => (
        <h1>{p.firstName}</h1>
      ))} 
    </div>

    </>
  );
};
