const initialState = {
  isPatientAccountReducerLoading: true,
  patient: {},
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
  gettingAppointments: false,
  appointments: [],
  errorGettingAppointments: '',
  gettingRecentDoctors: false,
  recentDoctors: [],
  errorGettingRecentDoctors: '',
  gettingRecords: false,
  records: [],
  errorGettingRecords: '',
};

const PatientAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_PATIENT_INFO': {
      return {
        ...state,
        patient: action.payload,
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
    case 'GETTING_APPOINTMENT_LIST':
      return {
        ...state,
        gettingAppointments: true,
      };
    case 'GOT_APPOINTMENT_LIST':
      return {
        ...state,
        gettingAppointments: false,
        appointments: action.payload,
        errorGettingAppointments: '',
      };
    case 'ERROR_GETTING_APPOINTMENT':
      return {
        ...state,
        gettingAppointments: false,
        appointments: '',
        errorGettingAppointments: action.payload,
      };
    case 'GETTING_RECENT_DOCTORS':
      return {
        ...state,
        gettingRecentDoctors: true,
      };
    case 'GOT_RECENT_DOCTOR':
      return {
        ...state,
        gettingRecentDoctors: false,
        recentDoctors: action.payload,
        errorGettingRecentDoctors: '',
      };
    case 'ERROR_GETTING_RECENT_DOCTOR':
      return {
        ...state,
        gettingRecentDoctors: false,
        recentDoctors: '',
        errorGettingRecentDoctors: action.payload,
      };
    case 'GETTING_RECORDS':
      return {
        ...state,
        gettingRecords: true,
      };
    case 'GOT_RECORDS':
      return {
        ...state,
        gettingRecords: false,
        records: action.payload,
        errorGettingRecords: '',
      };
    case 'ERROR_GETTING_RECORDS':
      return {
        ...state,
        gettingRecords: false,
        records: '',
        errorGettingRecords: action.payload,
      };
    default:
      return state;
  }
};

export default PatientAccountReducer;
