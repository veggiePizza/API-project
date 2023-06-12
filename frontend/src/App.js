import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateSpot from "./components/Spots/CreateSpot"
import LoginFormModal from "./components/LoginFormModal";
import SpotPage from "../src/components/Spots/SpotPage"
import LandingPage from "../src/components/Spots/LandingPage"
import SpotsManagement from "./components/Spots/SpotsManagement";
import UpdateSpot from "./components/Spots/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path='/spots/current' component={SpotsManagement} />
            <Route exact path='/spots/new' component={CreateSpot} />
            <Route exact path='/spots/:id' component={SpotPage} />
            <Route exact path='/spots/:id/edit' component={UpdateSpot} />
            <Route exact path="/login" component={LoginFormModal}/> 
          </Switch>

        </>
      )}
    </>
  );
}

export default App;