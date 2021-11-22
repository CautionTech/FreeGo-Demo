import React, { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";
import './UserPage.css';
import PageHeader from '../PageHeader/PageHeader';

function UserPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchHazards();
  }, []);

  /**
   * Fetch Hazards
   * fetches dashboard data from the database
   */
  function fetchHazards() {
    dispatch({
      type: "FETCH_HAZARD",
    });
  }

  /**
   * Handle Nav Click
   * Pass in a path as a string to navigate
   */
  const handleNavClick = (path) => {
    history.push(path);
  }

  return (

    <div className="container-fluid">
      <PageHeader 
      title = {user.role === 1 ? "Admin" : "My Account"}
      description = "my account details"
      />
      <div className="container margin-top-25">
        <div className="row">
          <div className="col-lg-3 me-lg-auto user-settings-info">
            <div className="card border-0 shadow mb-6 mb-lg-0">
              <div className="card-header bg-gray-100 py-4 border-0 text-center">
                <a className="d-inline-block" href="#">
                  <img className="d-block avatar avatar-xxl p-2 mb-2" src="https://d19m59y37dris4.cloudfront.net/directory/2-0-1/img/avatar/avatar-10.jpg" alt=""></img></a>
                <h2>Welcome, {user.first_name}!</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-9 ps-lg-5">
            <div classNameName="row">
              <ul className="list-group user-settings-menu">

                <li onClick={() => handleNavClick('/profilepage')} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="user-menu-item-group">
                    <strong>Account Settings</strong><br />
                    <i>Manage your account </i>
                  </div>
                <span className="badge badge-primary badge-pill"><FontAwesomeIcon icon={faChevronRight} /></span>
                </li>

                <li onClick={() => handleNavClick('/hazardmanagement')} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="user-menu-item-group">
                    <strong>Manage Hazards</strong><br />
                    <i>{user.role === 1 ? "Manage Hazards" : "Manage my Hazards"}</i>
                  </div>
                <span className="badge badge-primary badge-pill"><FontAwesomeIcon icon={faChevronRight} /></span>
                </li>

                <li onClick={() => dispatch({ type: 'LOGOUT' })} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="user-menu-item-group">
                    <strong>Log Out</strong><br />
                  </div>
                  <span className="badge badge-primary badge-pill"><FontAwesomeIcon icon={faChevronRight} /></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
