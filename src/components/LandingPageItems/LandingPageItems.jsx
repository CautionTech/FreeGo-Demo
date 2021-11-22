import React from "react";
import '../LandingPage/LandingPage.css'

/**
 * Simply renders the landing page item details
 * This could potentially be part of just landing page - less confusion?
 * @param {*} param0 
 * @returns 
 */
export default function LandingPageItems({ items }) {
  return (
    <>
      <div className="information-conatiner col-sm-7">
        <div className="card-body">
          <div className="card-title">{items.name}
          </div>
          <h3 className="threat">
          <span>Hazard Genre: {items.title}</span>
          </h3>
          <h3 className="threat">
            Threat Level: {items.threat_level}
          </h3>
          <div className="status">
            <p className="threatLevel">
              Status:{" "}
              {items.approved === true ? (
                <span>Approved</span>
              ) : (
                <span>Pending</span>
              )}
            </p>
          </div>
          <div className="address">
            <p>
              <i className="fa fa-map-marker"></i> {items.street}, {items.city}{" "}
              {items.state}
            </p>
          </div> 
        </div>
      </div>
    </>
  );
}
