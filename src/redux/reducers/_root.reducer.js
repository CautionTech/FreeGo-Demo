import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import dashBoardReducer from './Dashboard.reducer';
import hazardReducer from './hazard.reducer';
import userHazard from './userHazarad.reducer';
import openMinneapolisApi from './OpenMinneapolisAPI.reducer';
import cardDetails from './HazardCardDetails.reducer';
import editUser from './editUser.reducer'
import flaggedHazards from './flaggedHazards.reducer'
import hazardGenre from './hazardGenre.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  hazardReducer, // will have hazard information
  dashBoardReducer, //will have dashboard data information
  openMinneapolisApi,  //will get data from open minneapolis open api 
  cardDetails,
  userHazard,
  editUser,
  flaggedHazards,
  hazardGenre
});

export default rootReducer;
