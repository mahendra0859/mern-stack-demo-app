const initialState = {
  show: false,
  success: false,
  message: "",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_TOASTER":
      return {
        show: true,
        success: action.payload.success,
        message: action.payload.message,
      };
    case "REMOVE_TOASTER":
      return { ...initialState };
    default:
      return { ...state };
  }
};
export default reducer;
