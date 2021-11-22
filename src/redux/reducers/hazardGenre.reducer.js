const hazardGenre = (state = {}, action) => {
    switch(action.type) {
        case "SET_HAZARD_GENRE":
            return action.payload;
        default:
            return state;
    }
}

export default hazardGenre;