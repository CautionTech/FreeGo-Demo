import React from "react";
import { useHistory } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import { useSelector } from "react-redux";
import LandingPageItems from "../LandingPageItems/LandingPageItems";
import AddHazardButton from "../AddHazardButton/AddHazardButton";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import PageHeader from '../PageHeader/PageHeader';

export default function LandingPage({location}) {
  const history = useHistory();
  const dashBoard = useSelector((store) => store.dashBoardReducer);

  /**
   * Navigate to Individual Hazard Detail Component
   * @param {*} id 
   */
  const hazardNav = (id) => {
    history.push(`/details/${id}`)
  }

  /**
   *  Navigate to Individual EXTERNAL Hazard Detail Component
   * This could certainly be improved - time constraint hack
   * @param {} item 
   */
  const externalHazardNav = (item) => {
    history.push({
      pathname: '/detail-external',
      state: item
    })
  }

  /**
   * Return
   * Code duplication in the return to deal with the external API data and that of the database
   * This can/should certainly be improved, but again time constraint.
  */
  return (
    <>
      <PageHeader 
        title = 'Hazards'
        description = 'Stay Safe'
      />
      <AddHazardButton />
      <div className="container">
        <div className="row">
          {dashBoard.length > 0 ? (
            dashBoard.map((items, i) => (
              <>
                <div className="col-sm-6">
                  {items.is_minn == true ? (
                    <div className="card hazard-card" key={i} onClick={() => externalHazardNav(items)}>
                      <a href="https://opendata.minneapolismn.gov/datasets/cityoflakes::police-incidents-2021/about"  target="_blank" className="badge badge-primary">Source: External API</a>
                      <div className="row no-gutters">
                        {/* <div className="image-container col-sm-4">
                          <img src={items.image} alt=""/>
                        </div> */}
                      < LandingPageItems items={items} />{" "}
                      
                    </div>
                  </div>
                  ) : (
                    <div className="card hazard-card" key={i} onClick={() => hazardNav(items.id)}>
                      <span className="badge badge-pill badge-primary">Source: User Submitted</span>
                      <div className="row no-gutters">
                        {/* <div className="image-container col-sm-4">
                          <img src={items.image} alt=""/>
                        </div> */}
                      < LandingPageItems items={items} />{" "}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ))
          ) : (
            <p>
              This is the home page. When you have searched for hazards on 
              <a href="#/map"> the map page</a>, they will show up here as well.
              This is for those who want a linear format instead of a map view. You
              will not be able to find hazards on any other location aside from 
              Minneapolis at the moment. This is purely for demonstration of the FreeGo concept. 
              
              Please go to <a href="#/map">the map page</a> to populate hazards. Simply search by an address. Currently Minneapolis Data is available to view.
            </p>
          )}
        </div>
      </div>
      <FilterDrawer location={location} />
    </>
  );
}
