import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import { getProfile } from "../Managers/ProfileManager";

export const ProfilePage = () => {
  // const [points, setPoints] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    getProfile().then(setProfile);
  },[profile]);


  return (
    <>
      <div className="pDiv">


<div className="progression">Progress: </div>
        

      {profile.map((p) => (
          <div key={p.id}>
            {p.weeks >= 1 && <h1 className="weeks"> Weeks: {p.weeks}</h1>}
            {p.points >= 1 && <h1 className="numbers">Points: {p.points}</h1>}
            {p.weeks >= 1 && p.points >= 1 && (
              <h1 className="total">Completion %: {p.weeks / p.points * 100}</h1>
            )}
          </div>
        ))}
      </div>

    </>
  );
};



