const initialState = {
  isPatientAccountReducerLoading: true,
  patient: null,
  patientVitals: null,
  errorInPatientAccountReducer: [],
  patientFavDoc: [],
  familyMember: [],
  profileInfo: [],
  appointmentForSlotLoading: false,
  appointmentForSlot: [],
  appointmentForSlotError: '',
  bookingAppointment: false,
  bookedAppointment: '',
  errorBookingAppointment: '',
  uploadingRecords: false,
  uploadedRecords: '',
  errorUploadingRecords: '',
  addMedicineLoading: false,
  addMedicineError: '',
  gettingMedicine: false,
  medicines: [],
  gettingMedicineError: '',
};

const ADD_MEDICINE_LOADING = 'ADD_MEDICINE_LOADING';
const MEDICINE_ADDED = 'MEDICINE_ADDED';
const ADD_MEDICINE_ERROR = 'ADD_MEDICINE_ERROR';
const GETTING_MEDICINE = 'GETTING_MEDICINE';
const DONE_GETTING_MEDICINE = 'DONE_GETTING_MEDICINE';
const ERROR_GETTING_MEDICINE = 'ERROR_GETTING_MEDICINE';

const PatientAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_PATIENT_INFO': {
      return {
        ...state,
        patient: action.payload,
        patientVitals: action.medInfo,
        isPatientAccountReducerLoading: false,
        errorInPatientAccountReducer: [],
      };
    }
    case 'SAVE_PATIENT_FEV_DOC': {
      return {
        ...state,
        patientFavDoc: [...patientFavDoc, action.payload],
      };
    }
    case 'SAVE_PATIENT_FAMILY_MEMBER': {
      return {
        ...state,
        familyMember: action.payload,
        isPatientAccountReducerLoading: false,
      };
    }
    case 'START_PATIENT_ACCOUNT_LOADING': {
      return {
        ...state,
        isPatientAccountReducerLoading: true,
      };
    }
    case 'HAVEING_ERROR_IN_PATIENT_ACCOUNT_REDUCER': {
      return {
        ...state,
        errorInPatientAccountReducer: action.payload,
        isPatientAccountReducerLoading: false,
      };
    }
    case 'RESET_PATIENT_ACCOUNT_REDUCER': {
      return {
        isPatientAccountReducerLoading: true,
        patient: null,
        errorInPatientAccountReducer: [],
        patientFavDoc: [],
        familyMember: [],
      };
    }
    case 'PROFILE_PIC_UPLOADED':
      return {
        ...state,
        isPatientAccountReducerLoading: false,
      };
    case 'START_APPOINTMENT_SLOT_LOADING':
      return {
        ...state,
        appointmentForSlotLoading: true,
      };
    case 'APPOINTMENT_SLOT_LOADED':
      return {
        ...state,
        appointmentForSlotLoading: false,
        appointmentForSlot: action.payload,
      };
    case 'APPOINTMENT_SLOT_ERROR':
      return {
        ...state,
        appointmentForSlotLoading: false,
        appointmentForSlotError: action.payload,
      };
    case 'BOOKING_APPOINTMENT':
      return {
        ...state,
        bookingAppointment: true,
      };
    case 'BOOKED_APPOINTMENT':
      return {
        ...state,
        bookedAppointment: action.payload,
        bookingAppointment: false,
      };
    case 'ERROR_BOOKING_APPOINTMENT':
      return {
        ...state,
        errorBookingAppointment: action.payload,
        bookingAppointment: false,
      };
    case 'RECORDS_UPLOADING':
      return {
        ...state,
        uploadingRecords: true,
      };
    case 'RECORDS_UPLOADED':
      return {
        ...state,
        uploadingRecords: false,
        uploadedRecords: action.payload,
      };
    case 'RECORDS_UPLOADING_ERROR':
      return {
        ...state,
        uploadingRecords: false,
        errorUploadingRecords: action.payload,
      };
    case 'ADD_MEDICINE_LOADING':
      return {
        ...state,
        addMedicineLoading: true,
      };
    case 'MEDICINE_ADDED':
      return {
        ...state,
        addMedicineLoading: false,
        addMedicineError: '',
      };
    case 'ADD_MEDICINE_ERROR':
      return {
        ...state,
        addMedicineLoading: false,
        addMedicineError: action.payload,
      };
    case 'GETTING_MEDICINE':
      return {
        ...state,
        gettingMedicine: true,
      };
    case 'DONE_GETTING_MEDICINE':
      return {
        ...state,
        gettingMedicine: false,
        medicines: action.payload,
        gettingMedicineError: '',
      };
    case 'ERROR_GETTING_MEDICINE':
      return {
        ...state,
        gettingMedicine: false,
        gettingMedicineError: action.payload,
      };
    default:
      return state;
  }
};

export default PatientAccountReducer;
