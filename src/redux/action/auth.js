import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Host} from '../../utils/connection';

import {resetDataStore} from './dataStore';
import {resetDoctor} from './doctoreAction';
import {resetQuestion} from './questionAction';

export const addUserToRedux = (data) => {
  return {
    type: 'AUTHENTICATED',
    data: data,
  };
};

export const addUserFullData = (data) => {
  return {
    type: 'FULLDATA',
    data: data,
  };
};

const SAVE_USER = 'SAVE_USER';
const ERROR = 'HAVEING_ERROR';
const LOADING = 'LOADING';
const REMOVE_USER = 'REMOVE_USER';
const SAVE_APPOINTMENT = 'SAVE_APPOINTMENT';
const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT';
const STOP_LOADING = 'STOP_LOADING';

const saveNewUser = (data, type) => {
  console.log(type.localeCompare('patient'));
  return {
    type: SAVE_USER,
    userData: data,
    userType: type.localeCompare('doctor') === 0,
  };
};
const haveingError = (err) => {
  return {
    type: ERROR,
    error: err,
  };
};

const startLoading = () => {
  return {
    type: LOADING,
  };
};

const stoptLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const setAppointment = (appointment) => {
  return {
    type: SAVE_APPOINTMENT,
    payload: appointment,
  };
};

const removeAppointment = (id) => {
  return {
    type: REMOVE_APPOINTMENT,
    payload: id,
  };
};

export const resetStore = () => {
  return async (dispatch) => {
    await dispatch(removeUser());
    // await dispatch(resetDoctor())
    await dispatch(resetDataStore());
    await dispatch(resetQuestion());
  };
};

export const LoginPatient = (data, success, failed) => {
  return (dispatch) => {
    // setup loading screen
    dispatch(startLoading());
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

    // setting header
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };

    console.log(data);

    axios
      .post(`${Host}/patient/authenticate`, data, config)
      .then((result) => {
        console.log(result.data);
        if (result.data.status) {
          const data = result.data.user;

          const _data = {
            id: data._id,
            email: data.email,
            phone: data.phone,
            name: data.firstName === undefined ? 'No name' : data.firstName,
            ...data,
          };

          dispatch(saveNewUser(_data, 'patient'));
          success({
            status: true,
            message: 'Patient Login Successful',
          });
        } else {
          failed({
            status: false,
            // message: 'something went wrong!! try again',
            message: result.data.error.slice(0, 20),
          });
          console.log('error 2');

          // dispatch(haveingError({error: 'something went wrong'}));
          dispatch(haveingError(result.data.error.slice(0, 20)));
        }
      })
      .catch((err) => {
        failed({
          status: false,
          message: 'something went wrong!! try again',
          // message: err.slice(0, 20),
        });
        console.log('error 1', err);
        dispatch(haveingError(err));
      });
  };
};

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export const LoginDoctor = (data, success, failed) => {
  return (dispatch) => {
    dispatch(startLoading());
    // setting header
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    console.log('1111111111111111111111111', data);
    axios
      .post(`${Host}/doctors/authenticate`, data, config)
      .then((result) => {
        console.log('222222222222222222222', result.data);

        if (result.data.status) {
          const data = result.data.user;

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
            message: 'Doctor Login successfully.',
          });
        } else {
          failed({
            status: false,
            // message: 'something went wrong!! try again',
            message: result.data.error.slice(0, 20),
          });
          // dispatch(stoptLoading());
          dispatch(
            haveingError({
              error: 'something went wrong',
            }),
          );
          // dispatch(haveingError(result.data.error));
        }
      })
      .catch((err) => {
        // console.log('****************** in err *****************', err)
        failed({
          status: false,
          // message: 'Incorrect Email and/or password'
          message: 'something went wrong',
          // message: err.slice(0, 20),
        });
        // dispatch(stoptLoading());
        dispatch(haveingError(err));
      });
  };
};

export const signupDoctor = (data, successCallback, errorCallback) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    const _data = data;

    console.log(_data);

    dispatch(startLoading());
    axios
      .post(`${Host}/doctors/register`, _data, config)
      .then((result) => {
        // console.log(result);
        if (result.data.status) {
          const __data = {
            mode: 'doctor',
            email: result.data.data.email,
            name: result.data.data.basic.name,
            phone: result.data.data.phone,
            id: result.data.data._id,
            ...result.data.data,
          };
          //   _save(__data);

          AsyncStorage.setItem('userData', JSON.stringify(__data))
            .then(() => {
              dispatch(saveNewUser(__data, 'doctor'));
              successCallback();
            })
            .catch((err) => {
              errorCallback(err);
              dispatch(haveingError(err));
            });
        }
        console.log(result.data.status);
      })
      .catch((err) => {
        errorCallback(err);
        dispatch(haveingError(err));
      });
  };
};

export const signupPatient = (data, successCallback, errorCallback) => {
  console.log('signingin');
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    dispatch(startLoading());
    axios
      .post(`${Host}/patient/register`, data, config)
      .then((result) => {
        console.log('result');
        if (result.data.status) {
          const __data = {
            email: result.data.data.email,
            name: result.data.data.firstName,
            phone: result.data.data.phone,
            id: result.data.data._id,
            ...result.data.data,
          };
          AsyncStorage.setItem('userData', JSON.stringify(__data)).then(() => {
            dispatch(saveNewUser(__data, 'patient'));
            successCallback();
          });

          console.log('@@@@@@@@@@@@@@@@@', result.data);
        } else {
          dispatch(haveingError('Something Went Wrong'));
          errorCallback('Something Went Wrong');
        }
      })
      .catch((err) => {
        console.log('@@@@@@@@@@@@@@@@@', err);
        dispatch(haveingError(err.message));
        errorCallback(err.message);
      });
  };
};

export const GetAppointmentData = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    console.log('works...');
    axios
      .get(`${Host}/patient/getinfo/${id}`)
      .then((result) => {
        if (result.status) {
          console.log(result.data.data.appointments);
          dispatch(setAppointment(result.data.data.appointments));
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};

export const RemoveAppointmentData = (id) => {
  return async (dispatch) => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const _data = {
      byPatient: 'true',
      byDoctor: 'false',
      reason: 'Have some important work',
      id: id,
    };

    await axios
      .post(`${Host}/appointment/cancel`, _data, config)
      .then((result) => {
        if (result.status) {
          console.log('Successfully cancel your appointment.');
          dispatch(removeAppointment(id));
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};
