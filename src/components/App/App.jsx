import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AddHazard from '../AddHazard/AddHazard';
import MapComponent from '../Map/Map';
import {  addDays, subDays } from 'date-fns';
import MapContainer from '../MapContainer/MapContainer';


import './App.css';
import HazardManagement from '../HazardManagement/HazardManagement';
import HazardCardDetails from '../HazardCardDetails/HazardCardDetails';
import HazardCardDetailsExternalAPI from '../HazardCardDetailsExternalAPI/HazardCardDetailsExternalAPI';
import ProfilePage from '../ProfilePage/ProfilePage';

import useCurrentLocation from "../../hooks/useCurrentLocation";
import useWatchLocation from "../../hooks/useWatchLocation";
import { geolocationOptions } from "../../constants/geolocationOptions";
import { useInterval } from '../../hooks/useInterval';
import Notification from '../Notification/Notification';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  // const { location: currentLocation, error: currentError } = useCurrentLocation(geolocationOptions);
  const { location, cancelLocationWatch, error } = useWatchLocation(geolocationOptions);
  const [isWatchinForLocation, setIsWatchForLocation] = useState(true);
  const [genre, setgenre] = useState('');
  const [threat_level, set_threat_level] = useState('%');
  const [created_date, setCreated_Date] = useState([
    {
      startDate: subDays(new Date(), 30),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);


  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  /**
   * Use Effect for user location
   * utilizes hook useWatchLocation
   */
  useEffect(() => {
    if (!location) return;
    // Cancel location watch after 3sec
    setTimeout(() => {
      cancelLocationWatch();
      setIsWatchForLocation(false);
      dispatch({
        type: "FETCH_HAZARD",
        payload: {
          date: created_date,
          genreTitle: genre,
          userLatLng: location,
          threat_Level: threat_level,
        },
      });
    }, 3000);
  }, [location, cancelLocationWatch]);

  /**
   * Use Interval
   * Queries our hazard table on an interval
   * Interval = 10000 <-- 10 seconds
   */
  // useInterval(async () => {
  //   dispatch({
  //     type: "FETCH_HAZARD",
  //     payload: location
  //   });
  // }, 20000)

  // date: created_date,
  // genreTitle: genre,
  // userLatLng: {latitude: lat, longitude: lng},
  // threat_Level: threat_level,

  /**
   * Is watching for location
   * this is required due to map render prior to getting back user lat / lng from Navigator.geolocation
   */
  // if (isWatchinForLocation) {
  //   return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
  // }

  return (
    <Router>
      <div className="container-fluid">
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/about" />


          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <Route
            exact
            path="/about"
          >
              <AboutPage />
          </Route>  
          <ProtectedRoute
            exact
            path="/user"
          >
              <UserPage />
          </ProtectedRoute>

          <ProtectedRoute 
            exact 
            path="/addhazard"
          >
              <AddHazard />
          </ProtectedRoute>

          <ProtectedRoute 
            exact 
            path="/hazardmanagement"
          >
              <HazardManagement />
          </ProtectedRoute>
          
          <ProtectedRoute exact path="/edithazard/:id">
              <AddHazard />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/about" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/about" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <ProtectedRoute 
            exact 
            path="/map"
          >
              <MapContainer address={location} />
          </ProtectedRoute>

          <Route exact path="/home">
            {
              user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <LandingPage location={location} />
              ) : (
                <Redirect to="/about" />
              )
              // Otherwise, show the Landing page
            }
          </Route>

          <ProtectedRoute 
            exact 
            path="/details/:id"
          >
              <HazardCardDetails />
          </ProtectedRoute>

          <ProtectedRoute 
            exact 
            path="/detail-external"
          >
              <HazardCardDetailsExternalAPI />
          </ProtectedRoute>

          <ProtectedRoute 
            exact 
            path="/profilepage"
          >
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute 
            exact 
            path="/notifications/:id"
          >
              <Notification />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
