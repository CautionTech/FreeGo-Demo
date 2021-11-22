const cardDetails = (state = {}, action) => {
  switch (action.type) {
    case "SET_HAZARD_CARD_DETAIL":
      return action.payload;
    default:
      return state;
  }
};

export default cardDetails