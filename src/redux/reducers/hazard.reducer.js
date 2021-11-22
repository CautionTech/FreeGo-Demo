const hazardReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_HAZARD_TO_EDIT':
            return action.payload;
        case 'UPDATE_EDIT_HAZARD':
            return action.payload;
        case 'CLEAR_HAZARD':
            return {};
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default hazardReducer;