import {combineReducers} from 'redux';

import AuthReducer from '../reducer/auth';
import DoctorReducer from './doctorReducer';
import QuestionReducer from './questionReducer';
import MyDoctorReducer from './doctor/myDoctorReducer';
import questionnaireReducer from './doctor/questionnaireReducer';
import PatientAccountReducer from './patientAccountReducer';

const allReducer = combineReducers({
  AuthReducer,
  PatientAccountReducer,
  DoctorReducer,
  MyDoctorReducer,
  QuestionReducer,
  questionnaireReducer,
});

export default allReducer;
