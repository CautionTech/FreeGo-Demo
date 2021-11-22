const userHazardReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_HAZARD':
            return action.payload;
        case 'CLEAR_USER_HAZARD':
            return {};
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default userHazardReducer;