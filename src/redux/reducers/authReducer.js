const initialState = {
  isAuthenticated: false,
  errors: null,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "GET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload,
      };

    default:
      return state;
  }
}
