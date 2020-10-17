import {combineReducers} from 'redux';

import AuthReducer from './AuthReducer';
import DoctorReducer from './DoctorReducer';
import DoctorToPatientReducer from './DoctorToPatientReducer';
import PatientReducer from './PatientReducer';

// doctorReducer ================== Now ==================== DoctorToPatientReducer
// MyDoctorReducer ================ Now ==================== DoctorReducer
const allReducer = combineReducers({
  AuthReducer,
  DoctorReducer,
  DoctorToPatientReducer,
  PatientReducer,
});

export default allReducer;
