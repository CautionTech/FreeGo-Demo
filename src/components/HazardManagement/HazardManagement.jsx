import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "../HazardManagement/HazardManagement.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const HazardManagement = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const hazard = useSelector((store) => store.userHazard);
  const user = useSelector(store => store.user);
  const flaggedHazards = useSelector(store => store.flaggedHazards);
  

  useEffect(() => {
    // fetching all user hazards and flagged hazards
    dispatch({ 
      type: "FETCH_USER_HAZARD",
      payload: user.id 
    });
    dispatch({ 
      type: "FETCH_FLAGGED_HAZARDS"
    });
  }, []);

  // deletes hazard
  const deleteHazard = (id) => {
    // looping through flagged hazards to see if any are flagged
    for (let flag of flaggedHazards) {
      if (id === flag.hazard_id) {
        // if the user is not an admin they will get this alert when they try to delete a flagged hazard
        if (user.role !== 1) {
          alert('Your hazard has been flagged! You may not delete its been reviewed by an Admin.');
          return;
        }
        // otherwise call delete flagged hazard function
        else {
          deleteFlagged(flag);
          return;
        }
      }
    }
    // if hazard is not flagged it will be deleted
      dispatch({
        type: "DELETE_HAZARD_ITEM",
        payload: id
      });
    }

  // deletes flagged hazard 
  const deleteFlagged = (item) => {
    dispatch({
      type: "DELETE_FLAG",
      payload: item.id
    });
    dispatch({
      type: "DELETE_HAZARD_ITEM",
      payload: item.hazard_id
    });
  }

  // edits hazard
  const editHazard = (id) => {
    for (let flag of flaggedHazards) {
      if (id === flag.hazard_id) {
        // if the user is not an admin they will get this alert when they try to edit a flagged hazard
        if (user.role !== 1) {
          alert('Your hazard has been flagged! You may not delete its been reviewed by an Admin.');
          return;
        }
        else {
          history.push(`/edithazard/${flag.hazard_id}`);
          return;
        }
      }
    }
    //if hazard is not flagged user can edit
    history.push(`/edithazard/${id}`);
  };

  // edits flagged hazard for admin
  const editFlagged = (item) => {
    history.push(`/edithazard/${item.hazard_id}`);
  }

  // unflags (deletes flag) hazard
  const unflagHazard = (id) => {
    dispatch({
      type: "DELETE_FLAG",
      payload: id
    })
  }

  return (
    <div className="container">
      {user.role === 1 &&
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Manage All Hazards</button>
          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Manage Flagged Hazards</button>
        </div>
      </nav>
      }

      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          {hazard.length > 0 ? (
            hazard.map((item, i) => (
              <div className="card hazard-management-card card" key={i}>
                <div className="image-container">
                  <img src={item.image} alt="" />
                </div>
                <div className="information-container">
                  <h3 className="Hazard-Genre">{item.name}</h3>
                  <h3 className="threat">
                    <span>{item.title}</span>
                  </h3>
                  <h3 className="threat">Threat Level: {item.threat_level}</h3>
                  <div className="status">
                    <p className="threatLevel">
                      Status:{" "}
                      {item.approved === true ? (
                        <span>Approved</span>
                      ) : (
                        <span>Pending</span>
                      )}
                    </p>
                  </div>
                  <div className="address">
                    <p>
                      <i className="fa fa-map-marker"></i> {item.street},{" "}
                      {item.city} {item.state}
                    </p>
                  </div>
                </div>
                <div className="hazard-management-button-container">
                  <button className="btn-hazard-management-edit" onClick={() => editHazard(item.id)}><FontAwesomeIcon icon={faEdit} /></button>
                  <button className="btn-hazard-management-delete" onClick={() => deleteHazard(item.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
              </div>
            ))
          ) : (
            <p>No Hazards To Display...</p>
          )}
        </div>

        {user.role === 1 &&
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        {flaggedHazards.length > 0 ? (
            flaggedHazards.map((flagged, i) => (
              <div className="card hazard-management-card card" key={i} >
                <div className="image-container">
                  <img src={flagged.image} alt="" />
                </div>
                <div className="information-container">
                  <h3 className="Hazard-Genre">{flagged.name}</h3>
                  <h3 className="threat">
                    <span>{flagged.title}</span>
                  </h3>
                  <h3 className="threat">Threat Level: {flagged.threat_level}</h3>
                  <div className="status">
                    <p className="threatLevel">
                      Status:{" "}
                      {flagged.is_accurate ? (
                        <span>Approved</span>
                      ) : (
                        <span>Flagged</span>
                      )}
                    </p>
                    <p>Reason: {flagged.flag_description}</p>
                    <button onClick={() => unflagHazard(flagged.id)}>Unflag</button>
                  </div>
                  <div className="address">
                    <p>
                      <i className="fa fa-map-marker"></i> {flagged.street},{" "}
                      {flagged.city} {flagged.state}
                    </p>
                  </div>
                </div>
                <div className="hazard-management-button-container">
                  <button className="btn-hazard-management-edit" onClick={() => editFlagged(flagged)}><FontAwesomeIcon icon={faEdit} /></button>
                  <button className="btn-hazard-management-delete" onClick={() => deleteFlagged(flagged)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
              </div>
            ))
          ) : (
            <p>No Flagged Hazards To Display...</p>
          )}
        </div>
      }
      </div>
    </div>
  );
};

export default HazardManagement;