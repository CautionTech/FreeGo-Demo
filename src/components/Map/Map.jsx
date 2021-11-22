import React, { useMemo, useState } from "react";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L, {latLngBounds} from 'leaflet';
import { useHistory } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import icon from 'leaflet/dist/images/marker-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import ReactToolTip from 'react-tooltip';
import "../Map/Map.css";

/**
 * -----------------------------------------------BUG-WORK-AROUND-----------------------------
 * React Leaflet bug workaround
 * The bug is: without the code below currently the map pins don't render due to incorrect path? <-- as far as I believe the issue to be
 */

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

// -------------------------------------------------------------------------------------------

function MapComponent({address}) {
  const history = useHistory();
  const [showpop, setshowpop] = useState(false);
  const [hazard, sethazard] = useState();
  const dashBoard = useSelector(store => store.dashBoardReducer)
  /**
   * Navigate to Individual Hazard Detail Component
   * @param {*} id 
   */
  const hazardDetailNav = (id) => {
    history.push(`/details/${id}`)
  }

  /**
   *  Navigate to Individual EXTERNAL Hazard Detail Component
   * This could certainly be improved - time constraint hack
   * @param {} item 
   */
  const ExternalHazardNav = (item) => {
    history.push({
      pathname: '/detail-external',
      state: item
    })
  }

  /**
   * Convert Object into an array
   */
  if (address instanceof Array) {
    // DO NOTHING
  } else {
    address = Object.keys(address).map((key) => address[key]);
  }

  /**
   * Building map bounds around the lat/lngs of all data
   * This positions the map and displays all lat/lng pins within its bounds
   */
  const bounds = latLngBounds(L.latLng(address));
  
  if(dashBoard.length > 0) {
    dashBoard.forEach((data) => {
      bounds.extend([data.latitude, data.longitude])
    })
  } else {
    bounds.extend(address)
  }

  const getIcon = (_iconSize) => {
    return L.icon({
      iconUrl: process.env.PUBLIC_URL + '/img/caution.jfif',
      iconSize: [_iconSize]
    });
  }

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }

  /**
   * Return
   * Code duplication in the return to deal with the external API data and that of the database
   * This can/should certainly be improved, but again time constraint.
   */
  return (
    <>
      <div className="map-popup-container">
        <Map center={address} zoom={14} bounds={bounds} style={{ height: "600px" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        {dashBoard.length > 0 ? (
         dashBoard.map((items, i) => (
            <div key={i}>
              <Marker 
                position={[items.latitude, items.longitude]}
                onClick={(e) => {
                  sethazard(items);
                  setshowpop(true);
                }}
              >
              </Marker>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <Marker
          position={[address[0], address[1]]}
          style={{ color: 'red' }}
          icon={getIcon(40)}
          ref={initMarker}
        >
          <Popup>
            Hover cursor over any pinpoint location to get specific data
          </Popup>
        </Marker>
        </Map>
        {
          showpop === true 
          ?
          <div className="popup-map-item card animate__animated animate__slideInUp">
             {hazard.is_minn == true ? (
                <div className="row no-gutters">
                  {/* <div className="image-container col-sm-4">
                    <img onClick={() => ExternalHazardNav(hazard)} src={hazard.image} alt=""/>
                  </div> */}
                  <div className="information-conatiner col-sm-7">
                    <button type="button" className="close btn-map-close" onClick={() => setshowpop(false)} aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <span className="badge badge-pill badge-primary" className={'badge-'+hazard.threat_level + ' badge badge-pill badge-primary'}>{hazard.threat_level}</span>
                    <div onClick={() => ExternalHazardNav(hazard)} className="card-title">{hazard.name}</div>
                    <div className="">
                      <div className="map-card-location">
                        <FontAwesomeIcon icon={faMapMarkedAlt} />
                        {hazard.street}, {hazard.city}, {hazard.state}, {hazard.zip}
                      </div>
                    </div>
                  </div>  
                </div>
             ) : (
              <div className="row no-gutters">
                {/* <div className="image-container col-sm-4">
                  <img onClick={() => hazardDetailNav(hazard.id)} src={hazard.image} alt=""/>
                </div> */}
                <div className="information-conatiner col-sm-7">
                  <button type="button" className="close btn-map-close" onClick={() => setshowpop(false)} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <span className="badge badge-pill badge-primary" className={'badge-'+hazard.threat_level + ' badge badge-pill badge-primary'}>{hazard.threat_level}</span>
                  <div onClick={() => hazardDetailNav(hazard.id)} className="card-title">{hazard.name}</div>
                  <div className="">
                    <div className="map-card-location">
                      <FontAwesomeIcon icon={faMapMarkedAlt} />
                      {hazard.street}, {hazard.city}, {hazard.state}, {hazard.zip}
                    </div>
                  </div>
                </div>  
              </div>
             )}
          </div> 
          :
          <div className="popup-map-item"></div>
        }        
      </div>
    </>
  );
}

export default MapComponent;
