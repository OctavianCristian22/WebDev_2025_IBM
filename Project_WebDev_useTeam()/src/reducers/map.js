const initialMapState = 'mainMap';

export default function mapReducer(state = initialMapState, action) {
  switch (action.type) {
    case 'TELEPORT_PLAYER':
      return action.payload.targetMap;
    case 'SET_MAP':
      return action.payload;
    default:
      return state;
  }
}
