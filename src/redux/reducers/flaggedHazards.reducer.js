const flaggedHazardsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_FLAGGED_HAZARDS':
            return action.payload;
        case 'CLEAR_FLAGGED_HAZARDS':
            return {};
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default flaggedHazardsReducer;