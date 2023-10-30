import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { tryGetLoggedInUser } from "./Managers/authManager";
import { Spinner } from "reactstrap";
import NavBar from "./Components/Navbar";
import ApplicationViews from "./Components/ApplicationViews";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Schedule } from "./Components/Schedule";
import { NewSchedule } from "./Components/NewSchedule";
import { ProfilePage } from "./Components/ProfilePage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);

  // wait to get a definite logged-in state before rendering
  if (loggedInUser === undefined) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />

    <Routes>
      <Route path="home" index element={<Home />} />
      <Route path="profilepage" element={<ProfilePage />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="newschedule" element={<NewSchedule />} />
    </Routes>

    </>
  );
}

export default App;