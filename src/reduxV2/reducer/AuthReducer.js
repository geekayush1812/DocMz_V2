const initialState = {
  loggingIn: false,
  isLoggedin: false,
  errorLogin: '',
  signingUp: false,
  errorSingup: '',
  isDoctor: false,
  userData: {},
  theme: 'PRIMARY',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        isDoctor: action.userType,
        userData: action.userData,
        isLogedin: true,
      };
    case 'LOGGING_IN':
      return {
        ...state,
        loggingIn: true,
        errorLogin: '',
      };
    case 'LOGGED_IN':
      return {
        ...state,
        loggingIn: false,
        errorLogin: '',
      };
    case 'ERROR_LOGIN':
      return {
        ...state,
        loggingIn: false,
        errorLogin: action.payload,
      };
    case 'SIGNING_UP':
      return {
        ...state,
        signingUp: true,
        errorSingup: '',
      };
    case 'SIGNED_UP':
      return {
        ...state,
        signingUp: false,
        errorSingup: '',
      };
    case 'ERROR_SIGNUP':
      return {
        ...state,
        signingUp: false,
        errorSingup: action.payload,
      };

    case 'HAVEING_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case 'REMOVE_USER':
      return {
        ...state,
        isDoctor: false,
        isLoading: false,
        isLogedin: false,
        data: [],
        error: [],
        appointment: [],
      };
    default:
      return state;
  }
};

export default AuthReducer;
