const inititalState = {
  isMyDoctorReducerLoading: false,
  doctorProfile: null,
  haveingMyDoctorReducerError: [],
  appointmentLoading: false,
  appointments: [],
  appointmentFetchError: '',
  allAppointmentLoading: false,
  allAppointments: [],
  allAppointmentFetchError: '',
  specialtyLoading: false,
  specialty: [],
  specialtyLoadingError: '',
  updatingDoctor: false,
  updatingDoctorError: '',
  recentPatientLoading: false,
  recentPatient: [],
  recentPatientError: '',
  appointments: [],
  gettingAppointment: false,
  errorGettingAppointment: '',
};

const MyDoctorReducer = (state = inititalState, action) => {
  switch (action.type) {
    case 'SAVE_MY_DOCTOR':
      return {
        ...state,
        doctorProfile: action.payload,
        haveingMyDoctorReducerError: false,
        isMyDoctorReducerLoading: false,
      };
    case 'HAVEING_MY_DOCTOR_REDUCER_ERROR':
      return {
        ...state,
        error: action.payload,
        isMyDoctorReducerLoading: false,
      };
    case 'START_MY_DOCTOR_REDUCER_LOADING':
      return {
        ...state,
        isMyDoctorReducerLoading: true,
      };
    case 'RESET_MY_DOCTOR_REDUCER':
      return {
        isMyDoctorReducerLoading: false,
        doctorProfile: null,
        haveingMyDoctorReducerError: [],
      };
    case 'APPOINTMENT_LOADING':
      return {
        ...state,
        appointmentLoading: true,
      };
    case 'APPOINTMENT_LOADED':
      return {
        ...state,
        appointments: action.payload,
        appointmentLoading: false,
      };
    case 'ERROR_APPOINTMENT_FETCHING':
      return {
        ...state,
        appointmentFetchError: action.payload,
        appointmentLoading: false,
      };
    case 'ALL_APPOINTMENT_LOADING': {
      return {
        ...state,
        allAppointmentLoading: true,
      };
    }
    case 'APPOINTMENT_LOADED_ALL':
      return {
        ...state,
        allAppointmentLoading: false,
        allAppointments: action.payload,
      };
    case 'ERROR_ALL_APPOINTMENT_FETCHING':
      return {
        ...state,
        allAppointmentLoading: false,
        allAppointmentFetchError: action.payload,
      };
    case 'SPECIALTY_LOADING':
      return {
        ...state,
        specialtyLoading: true,
      };
    case 'SPECIALTY_LOADED':
      return {
        ...state,
        specialtyLoading: false,
        specialty: action.payload,
      };
    case 'SPECIALTY_ERROR':
      return {
        ...state,
        specialtyLoading: false,
        specialtyLoadingError: action.payload,
      };
    case 'UPDATING_DOCTOR_PROFILE':
      return {
        ...state,
        updatingDoctor: true,
      };
    case 'UPDATED_DOCTOR_PROFILE':
      return {
        ...state,
        updatingDoctor: false,
        updatingDoctorError: '',
      };
    case 'UPDATING_DOCTOR_ERROR':
      return {
        ...state,
        updatingDoctor: false,
        updatingDoctorError: action.payload,
      };
    case 'GETTING_RECENT_PATIENTS':
      return {
        ...state,
        recentPatientLoading: true,
      };
    case 'GOT_RECENT_PATIENTS':
      return {
        ...state,
        recentPatientLoading: false,
        recentPatient: action.payload,
        recentPatientError: '',
      };
    case 'GETTING_RECENT_PATIENTS_ERROR':
      return {
        ...state,
        recentPatientLoading: false,
        recentPatientError: action.payload,
      };
    case 'GETTING_APPOINTMENT_LIST':
      return {
        ...state,
        gettingAppointment: true,
      };
    case 'GOT_APPOINTMENT_LIST':
      return {
        ...state,
        gettingAppointment: false,
        appointments: action.payload,
        errorGettingAppointment: '',
      };
    case 'ERROR_GETTING_APPOINTMENT':
      return {
        ...state,
        gettingAppointment: false,
        appointments: '',
        errorGettingAppointment: action.payload,
      };
    default:
      return state;
  }
};

export default MyDoctorReducer;
