const editUser = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_TO_EDIT':
            return action.payload;
        case 'UPDATE_EDIT_USER':
            return action.payload;
        case 'CLEAR_USER':
            return {};
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default editUser;