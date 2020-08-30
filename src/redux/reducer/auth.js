const initialState = {
  isLoading: false,
  isLogedin: false,
  isDoctor: false,
  data: [],
  error: [],
  appointment: [],
  blockingDoctor: false,
  blockingDoctorError: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        isDoctor: action.userType,
        data: action.userData,
        isLogedin: true,
        isLoading: false,
        error: [],
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
    case 'SAVE_APPOINTMENT':
      return {
        ...state,
        appointment: action.payload,
        isLoading: false,
      };
    case 'REMOVE_APPOINTMENT':
      console.log(appointment[0]);
      return {
        ...state,
        appointment: state.appointment.filter(
          (xappointment) => !xappointment.cancelledByPatient,
        ),
      };
    case 'BLOCK_DOCTOR_LOADING':
      return {
        ...state,
        blockingDoctor: true,
      };
    case 'DOCTOR_BLOCKED':
      return {
        ...state,
        blockingDoctor: false,
        blockingDoctorError: '',
      };
    case 'BLOCK_DOCTOR_ERROR':
      return {
        ...state,
        blockingDoctor: false,
        blockingDoctorError: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
