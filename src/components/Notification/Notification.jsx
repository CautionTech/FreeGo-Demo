import React from 'react';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';

/**
 * Notifications Component
 * This component renders our hazard list in a list format / non card
 * NOTE = This component isn't completed and should probably be removed from navigation until more attention is put into it - basically just another view list of hazards similar to landing page.
 */

function Notification() {
  const dispatch = useDispatch()
  const dashBoard = useSelector((store) => store.dashBoardReducer);
  const removeNotification = (id) => {
    dispatch({
      type: "DELETE_HAZARD_ITEM",
      payload: id,
    });
  }

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Alert</th>
            <th>Threat</th>
            <th>Date /Time</th>
            <th>Location</th>
            <th>REMOVE</th>
          </tr>
        </thead>

      <tbody>
        {dashBoard.length > 0 ? (
          dashBoard.map((items, i) => (
              <tr>
                <td>{items.name}</td>
                <td>{items.threat_level}</td>
                <td>{items.created_date}</td>
                <td>
                    <div className="map-card-location">
                      <FontAwesomeIcon icon={faMapMarkedAlt} />
                      {items.street}, {items.city}, {items.state}, {items.zip}
                    </div>
                  </td>
                <td><button className="btn btn-danger" onClick={() => removeNotification(items.id)}>REMOVE</button></td>
              </tr>
          ))
        ) : (
          <p>
            This is the Notification Page. The purpose of 
            this page is to provide an understandable timeline 
            of when events occurred.
          </p>
        )}
    </tbody>
    </table>
  </div>
  );
}

export default Notification;
