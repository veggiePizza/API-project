import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetSpots from "./components/Spots/GetSpots"
import CreateSpot from "./components/Spots/CreateSpot"
import ReadSpot from "./components/Spots/ReadSpot";
import LoginFormModal from "./components/LoginFormModal";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <LoginFormModal/>
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={GetSpots} />
          <Route exact path='/spots/:id' component={ReadSpot} />
        </Switch>
      )}
    </>
  );
}

export default App;

//          <Route exact path='/spots/new' component={CreateSpot} />

/*


          <Route exact path= "/login" component={LoginFormModal}> </Route>
*/