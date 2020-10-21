import axios from 'axios';
import {Host} from '../../utils/connection';
import {GetPatientInfo, UploadProfilePicPatient} from '../action/PatientAction';
import {GetDoctorProfile, UploadProfilePic} from '../action/DoctorAction';

import {resetDoctorReducer} from '../action/DoctorAction';
import {resetDoctorToPatientReducer} from '../action/DoctorToPatientAction';
import {resetPatientAccountReducer} from '../action/PatientAction';
import {resetQuestinnaireReducer} from '../action/QuestionnaireAction';

// import {resetDataStore} from './dataStore';
// import {resetQuestion} from './questionAction';

const SAVE_USER = 'SAVE_USER';
const LOGGING_IN = 'LOGGING_IN';
const LOGGED_IN = 'LOGGED_IN';
const ERROR_LOGIN = 'ERROR_LOGIN';
const SIGNING_UP = 'SIGNING_UP';
const SIGNED_UP = 'SIGNED_UP';
const ERROR_SIGNUP = 'ERROR_SIGNUP';

const RESET_AUTH_REDUCER = 'RESET_AUTH_REDUCER';

const ERROR = 'HAVEING_ERROR';
const LOADING = 'LOADING';

const saveNewUser = (data, type) => {
  return {
    type: SAVE_USER,
    userData: data,
    userType: type.localeCompare('doctor') === 0,
  };
};

const resetAuthReducer = () => ({
  type: RESET_AUTH_REDUCER,
});

export const resetStore = (callback = () => {}) => {
  return (dispatch) => {
    dispatch(resetAuthReducer());
    dispatch(resetQuestinnaireReducer());
    dispatch(resetPatientAccountReducer());
    dispatch(resetDoctorToPatientReducer());
    dispatch(resetDoctorReducer());
    callback();
  };
};

export const UpdateDoctor = (data, success, failed) => {
  return (dispatch) => {
    dispatch(startLoading());
    // setting header
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    axios
      .post(`${Host}/doctors/profile/update`, data, config)
      .then((result) => {
        if (result.data.status) {
          const data = result.data.data;

          const _data = {
            id: data._id,
            name: data.basic.name,
            email: data.email,
            phone: data.phone,
            ...data,
          };

          dispatch(saveNewUser(_data, 'doctor'));
          success({
            status: true,
            message: 'Doctor Updated',
          });
        } else {
          failed({
            status: false,
            message: result.data.error.slice(0, 20),
          });
          dispatch(
            haveingError({
              error: 'something went wrong',
            }),
          );
        }
      })
      .catch((err) => {
        failed({
          status: false,
          message: 'something went wrong',
        });
        dispatch(haveingError(err));
      });
  };
};

/**
 * ====================== LOGIN ACTION ==============================
 */

const loggingIn = () => ({
  type: LOGGING_IN,
});
const loggedIn = () => ({
  type: LOGGED_IN,
});
const errorLogin = (err) => ({
  type: ERROR_LOGIN,
  payload: err,
});
export const LoginPatient = (data, success, failed) => {
  return (dispatch) => {
    dispatch(loggingIn());
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    axios
      .post(`${Host}/patient/authenticate`, data, config)
      .then((result) => {
        if (result.data.status) {
          const data = result.data.user;
          const _data = {
            id: data._id,
            email: data.email,
            phone: data.phone,
            name: data.firstName === undefined ? 'No name' : data.firstName,
            ...data,
          };

          dispatch(loggedIn());
          dispatch(saveNewUser(_data, 'patient'));
          dispatch(GetPatientInfo(_data.id));
          success({
            status: true,
            message: 'Patient Login Successful',
          });
        } else {
          failed({
            status: false,
            message: result.data.error.slice(0, 20),
          });
          dispatch(errorLogin(result.data.error.slice(0, 20)));
        }
      })
      .catch((err) => {
        failed({
          status: false,
          message: 'something went wrong!! try again',
        });
        dispatch(errorLogin(err));
      });
  };
};

export const LoginDoctor = (data, success, failed) => {
  return (dispatch) => {
    dispatch(loggingIn());
    // setting header
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    axios
      .post(`${Host}/doctors/authenticate`, data, config)
      .then((result) => {
        if (result.data.status) {
          const data = result.data.user;
          const _data = {
            id: data._id,
            name: data.basic.name,
            email: data.email,
            phone: data.phone,
            ...data,
          };
          dispatch(loggedIn());
          dispatch(saveNewUser(_data, 'doctor'));
          //get doctor info
          dispatch(GetDoctorProfile(_data.id));
          success({
            status: true,
            message: 'Doctor Login successfully.',
          });
        } else {
          failed({
            status: false,
            message: result.data.error.slice(0, 20),
          });
          dispatch(errorLogin(result.data.error.slice(0, 20)));
        }
      })
      .catch((err) => {
        failed({
          status: false,
          message: 'something went wrong',
        });
        dispatch(errorLogin(err));
      });
  };
};
/**
 * ====================== LOGIN ACTION END==============================
 */

/**
 * ====================== SIGNUP ACTION ==============================
 */

const signingUp = () => ({
  type: SIGNING_UP,
});
const signedUp = () => ({
  type: SIGNED_UP,
});
const errorSignup = (err) => ({
  type: ERROR_SIGNUP,
  payload: err,
});
export const signupPatient = (
  data,
  imageData,
  successCallback,
  errorCallback,
) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    dispatch(signingUp());
    axios
      .post(`${Host}/patient/register`, data, config)
      .then((result) => {
        if (result.data.status) {
          const _data = result.data.data;
          const __data = {
            email: _data.email,
            name: _data.firstName,
            phone: _data.phone,
            id: _data._id,
            ..._data,
          };
          dispatch(signedUp());
          dispatch(saveNewUser(__data, 'patient'));
          dispatch(UploadProfilePicPatient(__data.id, imageData));
          dispatch(GetPatientInfo(__data.id));
          successCallback();
        } else {
          dispatch(errorSignup('Something Went Wrong'));
          errorCallback('Something Went Wrong');
        }
      })
      .catch((err) => {
        dispatch(errorSignup(err.message));
        errorCallback(err.message);
      });
  };
};
export const signupDoctor = (
  data,
  imageData,
  successCallback,
  errorCallback,
) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };

    dispatch(signingUp());
    axios
      .post(`${Host}/doctors/register`, data, config)
      .then((result) => {
        if (result.data.status) {
          const _data = result.data.data;
          const __data = {
            mode: 'doctor',
            email: _data.email,
            name: _data.basic.name,
            phone: _data.phone,
            id: _data._id,
            ..._data,
          };
          dispatch(signedUp());
          dispatch(saveNewUser(__data, 'doctor'));
          dispatch(UploadProfilePic(__data.id, imageData));
          dispatch(GetDoctorProfile(__data.id));
          successCallback('Doctor Signup successful');
        } else {
          new Error('Something went wrong!! try again');
        }
      })
      .catch((err) => {
        dispatch(errorSignup(err));
        errorCallback(err);
      });
  };
};

/**
 * ====================== SIGNUP ACTION END==============================
 */

/**
 * ====================== THEME ACTION ==============================
 */
// const CHANGING_THEME = 'CHANGING_THEME';
const CHANGE_THEME = 'CHANGE_THEME';

// export const changingTheme = () => ({
//   type: CHANGING_THEME,
// });
export const themeChanged = (theme) => {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};
/**
 * ====================== THEME ACTION END ==============================
 */
