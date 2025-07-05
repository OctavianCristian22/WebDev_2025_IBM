import { getSelectionRange } from "@testing-library/user-event/dist/utils";
import { GRID_SIZE } from "../constants/constante";

// Initial State pt x si y
const Random = () => ({

    x: Math.floor(Math.random()*GRID_SIZE),
    y: Math.floor(Math.random()*GRID_SIZE),

});

const initialState = {

    x: 0,
    y: 0,
    collectable: Random(),
    score: 0,
};


const playerReducer = ( state= initialState, action) => {
    switch ( action.type ) {
        case "INCREASE_X":
            return { ...state, x: Math.min(state.x + 1, GRID_SIZE - 1) };
        case "DECREASE_X":
            return { ...state, x: Math.max(state.x - 1, 0)};
        case "INCREASE_Y":
            return { ...state, y: Math.min(state.y + 1, GRID_SIZE - 1)};
        case "DECREASE_Y":
            return { ...state, y: Math.max(state.y - 1, 0)};
        case "COLLECT":
            return { ...state, collectable: Random(), score: state.score + 1};
        default:
            return state;
    }
};

export default playerReducer;