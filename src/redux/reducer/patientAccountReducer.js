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
};

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
    default:
      return state;
  }
};

export default PatientAccountReducer;
