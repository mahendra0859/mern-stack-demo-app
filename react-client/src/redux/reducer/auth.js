const initialState = {
  loading: false,
  token: null,
  user: null,
  users: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "FETCH_USERS":
      return {
        ...state,
        users: action.payload.users,
      };
    case "LOADING":
      return { ...state, loading: true };
    case "LOADED":
      return { ...state, loading: false };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};
export default reducer;
