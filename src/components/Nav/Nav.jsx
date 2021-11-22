import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBell, faMapMarkedAlt, faUserAlt, faCog, faPoll} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <li className="nav-item list-none">
          <a className="navbar-brand lis-none" href="#">
            <span className="hide-on-mobile">FreeGo: HFT</span>
            <img src={process.env.PUBLIC_URL + '/img/caution.jfif'} alt="caution_tech_logo" width="30" height="30"/>
          </a>
        </li>
          <div className="" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* If no user is logged in, show these links */}
                {user.id === null &&
                  // If there's no user, show login/registration links
                  <Link className="navLink" to="/login">
                    Login / Register
                  </Link>
                }
              </li>
              <li className="nav-item">
                {user.id === null &&
                // If there's no user, show login/registration links
                  <Link className="navLink" to="/">
                    Login / Register
                  </Link>
                }
              </li>
              <li className="nav-item nav-item-flex">
                {/* If a user is logged in, show these links */}
                {user.id && (
                  <>
                    <ReactTooltip />
                    <a target="_blank" data-tip="Please take this survey after your experience" className="navLink" href="https://forms.gle/tUcDEJyB1w2fzmxu5">
                      <FontAwesomeIcon icon={faPoll} />
                      <span className="hide-on-mobile">
                        Please Take Survey
                      </span>
                    </a>
                    <Link className="navLink" to="/home">
                      <FontAwesomeIcon icon={faHome} />
                      <span className="hide-on-mobile">
                        Home
                      </span>
                    </Link>

                    <Link className="navLink" to='/notifications/{user.id}'>
                      <FontAwesomeIcon icon={faBell} />
                      <span className="hide-on-mobile">
                        Notifications
                      </span>
                    </Link>

                    <Link className="navLink" to="/map">
                      <FontAwesomeIcon icon={faMapMarkedAlt} />
                      <span className="hide-on-mobile">
                        Map
                      </span>
                    </Link>

                    <li className="nav-item navLink dropdown">
                      <a className="navLink dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faCog} />
                        <span className="hide-on-mobile">
                          Settings
                        </span>
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                          <Link className="navLink" to="/user">
                            <FontAwesomeIcon icon={faUserAlt} />
                            <span className="">
                              Profile
                            </span>
                          </Link>
                        </li>
                        <li><hr className="dropdown-divider"></hr></li>
                        <li><LogOutButton className="navLink btn btn-danger btn-normalize" /></li>
                      </ul>
                    </li>
                  </>
                )}
              </li>
            </ul>
          </div>
      </div>
    </nav>
  );
}

export default Nav;
