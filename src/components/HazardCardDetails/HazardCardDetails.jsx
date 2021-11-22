import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import PageHeader from '../PageHeader/PageHeader';

export default function HazardCardDetails() {
  const history = useHistory()
  const params = useParams();
  const dispatch = useDispatch();
  const [flaggedHazard, setFlaggedHazard] = useState({});
  const user = useSelector(store => store.user);
  const detail = useSelector((store) => store.cardDetails);
  const id = params.id;

  // fetches hazard details and genre for card clicked on
  useEffect(() => {
    dispatch({
      type: "FETCH_HAZARD_CARD_DETAIL",
      payload: id,
    });
    dispatch({
      type: "FETCH_HAZARD_GENRE",
    });
  }, []);

  // updates with whats in inputs via local state
  const handleChange = (event) => {
    setFlaggedHazard({
      ...flaggedHazard, 
      [event.target.name]: event.target.value
    })
  };

  // adds reported hazard to flagged hazard table
  // gives user confirmation and navigates to home
  const handleSubmit = (hazardId) => {
    dispatch({ 
      type: 'ADD_FLAGGED_HAZARD', 
      payload: {...flaggedHazard, hazardId}
    });
    alert('Successfully Flagged! Admin will review this shortly')
    history.push('/home');
  };

  // changes 'approved' field in hazard table
  // and updates via dispatch to saga
  const changeStatus = (items) => {
    let cardDetails = detail[0];
    dispatch({
        type: 'ADD_EDIT_HAZARD',
        payload: {
          ...cardDetails,
          approved: (!items.approved)
        }
    });
    alert('Status Changed!');
    history.push('/home');
  }

  return (
    <div className="container-fluid">
        <PageHeader 
        title = 'Hazard'
        description = 'Hazard details'
        />

        <div className="row">
          <div className="col-sm">
            {detail.length > 0 ? (
              detail.map((items, i) => (
                <div key={i}>

                  {console.log(items)}
                  <div>
                    <img src={items.image} alt="image" />
                  </div>
                  <div>
                    <h4>
                      <span>Threat Level: {items.threat_level}</span>
                    </h4>
                    <h4>
                      {items.approved === true ? (
                        <span>Status: Approved</span>
                      ) : (
                        <span>Status: Pending</span>
                      )}
                      <br/>
                      {user.role === 1 &&
                        <button className="btn btn-primary" onClick={() => changeStatus(items)}>Change Status</button>
                      }
                    </h4>
                    <div>
                      <h2>Title: {items.name}</h2>
                      <h4>Description: {items.description}</h4>
                    </div>
                    <h4>Hazard Genre: {items.title}</h4>
                    <p>
                      <h4>Hazard Location:</h4>
                      <i className="fa fa-map-marker"></i> {items.street},{" "}
                      {items.city} {items.state}
                    </p>
                    <div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div>
                    {user.role !== 1 &&
                      <button 
                        type="button" className="btn btn-primary" 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal"
                      >
                        Flag Hazard
                      </button>
                    }
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Choose Reason For Inaccuracy</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <div className="form-group">
                                  <label for="flagDescription">Reason:</label>
                                  <select className="form-control" name="description" id="flagDescription" value={flaggedHazard.description} onChange={handleChange}>
                                      <option value="">Select A Reason</option>
                                      <option value="Hazard No Longer Exists">Hazard No Longer Exists</option>
                                      <option value="Information Is Inaccurate">Information Is Inaccurate</option>
                                      <option value="Other">Other</option>
                                  </select>
                              </div>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleSubmit(items.id)}>Submit</button>
                              </div>
                            </div>
                          </div>
                        </div> 
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
    </div>
  );
}
