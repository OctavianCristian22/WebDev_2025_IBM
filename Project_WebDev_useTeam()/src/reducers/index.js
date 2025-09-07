import { GRID_SIZE } from "../constants/constante";
import { MoveIfPossible } from "../utils/utils";
import { SOLIDS_MATRIX } from "../constants/constante";

const getRandomPosition = () => {
    let x, y;
    do {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
    } while ([1, 2, 3].includes(SOLIDS_MATRIX?.[y]?.[x]));
    return { x, y };
};

const initialState = {
    x: 0, 
    y: 0,
    collectables: Array.from({ length: 200 }, getRandomPosition),
    score: 0,
    playerDir: 'UP',
    attack: null,
    npcPositions: [],
};

const isNpcAt = (npcPositions, x, y) => {
    return npcPositions.some(npc => npc.x === x && npc.y === y);
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREASE_X": {
            const [newX, newY] = MoveIfPossible(state.x, state.y, 1, 0);
            if (isNpcAt(state.npcPositions, newX, newY)) return state;
            return { ...state, x: newX, y: newY, playerDir: 'RIGHT', attack: null };
        }

        case "DECREASE_X": {
            const [newX, newY] = MoveIfPossible(state.x, state.y, -1, 0);
            if (isNpcAt(state.npcPositions, newX, newY)) return state;
            return { ...state, x: newX, y: newY, playerDir: 'LEFT', attack: null };
        }

        case "INCREASE_Y": {
            const [newX, newY] = MoveIfPossible(state.x, state.y, 0, 1);
            if (isNpcAt(state.npcPositions, newX, newY)) return state;
            return { ...state, x: newX, y: newY, playerDir: 'DOWN', attack: null };
        }

        case "DECREASE_Y": {
            const [newX, newY] = MoveIfPossible(state.x, state.y, 0, -1);
            if (isNpcAt(state.npcPositions, newX, newY)) return state;
            return { ...state, x: newX, y: newY, playerDir: 'UP', attack: null };
        }

        case "COLLECT": {
            const updatedCollectables = state.collectables.filter(
                (collectable) => !(collectable.x === state.x && collectable.y === state.y)
            );
            return {
                ...state,
                collectables: [...updatedCollectables, getRandomPosition()],
                score: state.score + 1,
            };
        }

        case "ATTACK_START":
            return {
                ...state,
                attack: {
                    x: state.x,
                    y: state.y,
                    dir: state.playerDir,
                },
            };

        case "ATTACK_END":
            return {
                ...state,
                attack: null,
            };

        case "UPDATE_NPC_POSITIONS":
            return {
                ...state,
                npcPositions: action.payload,
            };

        case "TELEPORT_PLAYER":
            return {
                ...state,
                x: action.payload.targetX,
                y: action.payload.targetY,
            };

        default:
            return state;
    }
};

export default playerReducer;
