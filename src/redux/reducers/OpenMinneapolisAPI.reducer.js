const openMinneapolisApi = (state ={}, action) => {
    switch (action.type) {
      case "SET_OPEN_MINNEAPOLIS_API":
        return action.payload;
      default:
        return state;
    }

}

export default openMinneapolisApi