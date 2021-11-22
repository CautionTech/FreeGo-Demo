import React from 'react';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function AddHazardButton() {
  const history = useHistory();

  // takes you to add hazard component
  const handleClick = () => {
    history.push("/addhazard");
  };

  return (

    <div className="add-hazard-btn-container">
      <button className="btn btn-primary" onClick={handleClick}>
        <FontAwesomeIcon icon={faPlus} />
        <span className="hide-on-mobile">Add A Hazard</span>
      </button>
    </div>
  );
}

export default AddHazardButton;
