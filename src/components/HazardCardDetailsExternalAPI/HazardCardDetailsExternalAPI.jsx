import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import PageHeader from '../PageHeader/PageHeader';
import { useLocation } from "react-router-dom";

export default function HazardCardDetailsExternalAPI() {
  // const history = useHistory()
  // const params = useParams();
  // const dispatch = useDispatch();
  // const id = params.id;
  const user = useSelector(store => store.user);
  // const genre = useSelector((store) => store.hazardGenre);
  // const [flaggedHazard, setFlaggedHazard] = useState({});
  // const [hazard_title, set_hazard_title] = useState('');
  const location = useLocation();
  const detail = location.state;

  console.log('location', location);

  console.log('detail', detail);

  // useEffect(() => {
  //   dispatch({
  //     type: "FETCH_HAZARD_CARD_DETAIL",
  //     payload: id,
  //   });
  // }, []);

  // useEffect(() => {
  //   getHazardGenre()
  // }, [])

  // const getHazardGenre = () => {
  //    dispatch({
  //      type: "FETCH_HAZARD_GENRE",
  //    });
  // }

  // const handleChange = (event) => {
  //   setFlaggedHazard({
  //     ...flaggedHazard, 
  //     [event.target.name]: event.target.value
  //   })
  // };

  // const handleSubmit = (hazardId) => {
  //   dispatch({ 
  //     type: 'ADD_FLAGGED_HAZARD', 
  //     payload: {...flaggedHazard, hazardId}
  //   });
  // };

  // const changeStatus = (items) => {
  //   let cardDetails = detail[0];
  //   dispatch({
  //     type: 'ADD_EDIT_HAZARD',
  //     payload: {
  //       ...cardDetails,
  //       approved: (!items.approved)
  //     }
  // })

  //   alert('Status Changed!');
  //   history.push('/home');
  // }

  return (
    <div className="container-fluid">
        <PageHeader 
        title = 'Hazard'
        description = 'Hazard details'
        />

        <div className="row">
          <div className="col-sm">
                <div className="container-fluid">
  
                  <div>
                    <img className="external-api-img" src={detail.image} alt="image" />
                  </div>
                  <div> 
                    <h4>
                      <br/>
                      {user.role === 1 &&
                        <button className="btn btn-primary" onClick={() => changeStatus(items)}>Change Status</button>
                      }
                    </h4>
                    <div>
                      <h4>Title: {detail.name}</h4>
                      {/* <h4>Description: {detail.description}</h4> */}
                    </div>
                    {/* <h4>Hazard Genre: {detail.title}</h4> */}
                    {/* {set_hazard_title(items.title)} */}
                    <p>
                      <h4>Hazard Location</h4>
                      <i className="fa fa-map-marker"></i> {detail.street},{" "}
                      {detail.city} {detail.state}
                    </p>
                    <div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              
          </div>
        </div>
    </div>
  );
}
