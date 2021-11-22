import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Geocode from "react-geocode";
import PageHeader from '../PageHeader/PageHeader';
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
//TODO = create env variable
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

function AddHazard() {
    const hazardReducer = useSelector(store => store.hazardReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        // If there is no id params we clear out hazardReducer
        // we are in add hazard mode
        if (params.id === undefined) {
            dispatch({
                type: 'CLEAR_HAZARD'
            });
        }
        else {
            // otherwise we fetch hazard to edit from reducer
            // Edit mode
            dispatch({
                type: 'FETCH_HAZARD_TO_EDIT',
                payload: params.id
            });
        }
    }, [params.id]); // we call useEffect again if id changes

    // clears out reducer then navigates to previous route
    const handleBack = () => {
        dispatch({
            type: 'CLEAR_HAZARD'
        });
        history.goBack();
    }

    // updates reducer when there is a change in the form fields
    const handleChange = (event) =>{
        dispatch({
            type: 'UPDATE_EDIT_HAZARD',
            payload: {
                ...hazardReducer, 
                [event.target.name]: event.target.value
            }
        });
      };

    // when form is submitted we convert user given address to lat and lng coordinates
    const getUserLocal = (event) => {
        event.preventDefault();
        if(hazardReducer.street && hazardReducer.city && hazardReducer.state && hazardReducer.zip) {
            let address = hazardReducer.street + ' ' + hazardReducer.city + ' ' + hazardReducer.zip;
            Geocode.fromAddress(address).then(
                (response) => {
                  const { lat, lng } = response.results[0].geometry.location;
                  let hazardLocal = {...hazardReducer, latitude:lat, longitude: lng, threat_level: 'severe', image: ''}; // add lat and lng to what was previously in reducer
                  handleSubmit(hazardLocal); // pass to handle submit
                },
                (error) => {
                  console.error(error);
                }
            );
        }
    }

    // dispatches to redux store
    const handleSubmit = (hazardLocal) => {
        // this dispatch sends the edited/added hazard to hazard saga
        dispatch({
            type: 'ADD_EDIT_HAZARD',
            payload: hazardLocal
        });
        // clears out hazardReducer that held hazard to edit
        dispatch({
            type: 'CLEAR_HAZARD'
        });
        // gets all hazards 
        dispatch({
            type: "FETCH_HAZARD",
            payload: {latitude: hazardLocal.latitude, longitude: hazardLocal.latitude}
        });
        history.push('/home');
        // location.reload();
    }

    return (
        <div className="container-fluid">
            <PageHeader 
            title =
            {params.id === undefined ?
                "Add Hazard" :
                "Edit Hazard"
            }
            description = "Here you can add a hazard"
            />
            <button className="btn btn-secondary" onClick={handleBack}>Back</button>
            <br />
            <h1>
                {params.id === undefined ?
                    "Add Hazard" :
                    "Edit Hazard"
                }
            </h1>
            <div className="container">
                <p>
                This is the Add Hazard Page. You can submit the 
                hazards that you find in your area here. Simply 
                give a place, description, and genre. 
                All fields are required. Any missing field will 
                result in an error. After you submit, they will 
                not appear right away. You need to first wait for the 
                hazard to be approved by an admin. 
                </p>
                <form className="card card-form" onSubmit={getUserLocal}>
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="name"
                            name='name'
                            value={hazardReducer.name}
                            onChange={handleChange}
                            required
                        />               
                    </div>
                    <div className="form-group">
                        <textarea 
                            className="form-control"
                            placeholder="description"
                            name='description'
                            rows="4"
                            value={hazardReducer.description}
                            onChange={handleChange}
                            required
                        >
                        </textarea>
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="street"
                            name='street'
                            value={hazardReducer.street}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="city"
                            name='city'
                            value={hazardReducer.city}
                            onChange={handleChange}
                            required
                        />                    
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="state"
                            name='state'
                            value={hazardReducer.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="zip"
                            name='zip'
                            value={hazardReducer.zip}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="image"
                            name='image'
                            value={hazardReducer.image}
                            onChange={handleChange}
                        />
                    </div> */}
                    {/* <div className="form-group">
                        <label for="threatLevel">Hazard Threat Level:</label>
                        <select className="form-control" name="threat_level" id="threatLevel" value={hazardReducer.threat_level} onChange={handleChange}>
                            <option selected disabled>Select A Threat Level</option>
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                        </select>
                    </div> */}
                    <div className="form-group">
                        <label for="genre">Hazard Genre:</label>
                        <select className="form-control" name="genre_id" id="genre" value={hazardReducer.genre_id} onChange={handleChange} required>
                            <option selected disabled >Select A Genre</option>
                            <option value="1">CRIME</option>
                            <option value="2">ROAD WORK</option>
                            <option value="3">ACCIDENT</option>
                            <option value="4">OTHER</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" type="submit">
                    {params.id === undefined ?
                        "Submit" :
                        "Save"
                    }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddHazard

