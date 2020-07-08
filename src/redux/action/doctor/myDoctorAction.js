import axios from 'axios';
import {Host} from '../../../utils/connection';

const save = 'SAVE_MY_DOCTOR';
const loading = 'START_MY_DOCTOR_REDUCER_LOADING';
const err = 'HAVEING_MY_DOCTOR_REDUCER_ERROR';
const reset = 'RESET_MY_DOCTOR_REDUCER';
const APPOINTMENT_LOADING = 'APPOINTMENT_LOADING';
const APPOINTMENT_LOADED = 'APPOINTMENT_LOADED';
const ERROR_APPOINTMENT_FETCHING = 'ERROR_APPOINTMENT_FETCHING';
const ALL_APPOINTMENT_LOADING = 'ALL_APPOINTMENT_LOADING';
const APPOINTMENT_LOADED_ALL = 'APPOINTMENT_LOADED_ALL';
const ERROR_ALL_APPOINTMENT_FETCHING = 'ERROR_ALL_APPOINTMENT_FETCHING';
const SPECIALTY_LOADING = 'SPECIALTY_LOADING';
const SPECIALTY_LOADED = 'SPECIALTY_LOADED';
const SPECIALTY_ERROR = 'SPECIALTY_ERROR';

const saveDoc = (data) => {
  return {
    type: save,
    payload: data,
  };
};

const startLoading = () => {
  return {
    type: loading,
  };
};

const haveingError = (error) => {
  return {
    type: err,
    payload: error,
  };
};

export const resetMyDoctorReducer = () => {
  return {
    type: reset,
  };
};

const startAppointmentLoading = () => {
  return {
    type: APPOINTMENT_LOADING,
  };
};

const appointmentLoaded = (appointments) => {
  return {
    type: APPOINTMENT_LOADED,
    payload: appointments,
  };
};

const startAppointmentLoadingAll = () => {
  return {
    type: ALL_APPOINTMENT_LOADING,
  };
};
const appointmentLoadedAll = (appointments) => {
  return {
    type: APPOINTMENT_LOADED_ALL,
    payload: appointments,
  };
};
const errorFetchingAllAppointments = (err) => {
  return {
    type: ERROR_ALL_APPOINTMENT_FETCHING,
    payload: err,
  };
};
const errorFetchingAppointments = (err) => {
  return {
    type: ERROR_APPOINTMENT_FETCHING,
    payload: err,
  };
};

const specialtyLoading = () => {
  return {
    type: SPECIALTY_LOADING,
  };
};
const specialtyLoaded = (specialty) => {
  return {
    type: SPECIALTY_LOADED,
    payload: specialty,
  };
};
const specialtyError = (error) => {
  return {
    type: SPECIALTY_ERROR,
    payload: error,
  };
};

/*
       {
             "limit":"3", 
             "doctor":"5dad6ba6f4ab551864e63f01",
            "date":"2019-11-16T10:24:39.736Z"
       }
*/

export const GettingDocterLatestInfo = (id, limit = 3) => {
  return (dispatch) => {
    dispatch(startLoading());
    const __params = {
      limit: limit,
      doctror: id,
      // doctor: '5dad6ba6f4ab551864e63f00',
      date: new Date().toISOString(),
      // date: '2020-04-25T10:24:39.736Z',
    };

    axios.get(`${Host}/doctors/getdoc/${__params.doctor}`).then((result) => {
      if (result.data.status) {
        dispatch(saveDoc(result.data.data));
      } else {
        console.log('someting wrong');
        dispatch(haveingError(result.data.message));
      }
    });
  };
};

export const FetchAppointments = (docId, date) => {
  return async (dispatch) => {
    const data = {
      docId,
      date,
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    dispatch(startAppointmentLoading());
    try {
      const req = await axios.post(
        `${Host}/doctors/appointment/next`,
        data,
        config,
      );
      const response = req.data;
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      let appointments = response.data.appointments;
      appointments = appointments
        .filter((item) => {
          // return true;
          const date = new Date(item.bookedFor);
          const bookedDate = date.getDate();
          const bookedYear = date.getFullYear();
          const bookedMonth = date.getMonth();
          const now = new Date();
          const nowDate = now.getDate();
          const nowYear = now.getFullYear();
          const nowMonth = now.getMonth();

          if (
            bookedDate === nowDate &&
            bookedYear === nowYear &&
            bookedMonth === nowMonth
          )
            return true;
          else return false;
        })
        .filter((item) => item.booked)
        .sort((a, b) => {
          return a.bookedFor - b.bookedFor;
        });
      dispatch(appointmentLoaded(appointments));
    } catch (e) {
      console.log(e);
      dispatch(errorFetchingAppointments(e));
    }
  };
};

export const FetchAllAppointments = (docId, date) => {
  return async (dispatch) => {
    const data = {
      docId,
      date,
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    dispatch(startAppointmentLoadingAll());
    try {
      const req = await axios.post(
        `${Host}/doctors/appointment/next`,
        data,
        config,
      );
      const response = req.data;
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      let appointments = response.data.appointments;
      appointments = appointments.reduce((acc, cur) => {
        const date = new Date(cur.bookedFor).getDate();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(cur);
        return acc;
      }, []);

      dispatch(appointmentLoadedAll(appointments));
    } catch (e) {
      console.log(e);
      dispatch(errorFetchingAllAppointments(e));
    }
  };
};

export const getSpecialty = (pageNo = 0, size = 5) => {
  return async (dispatch) => {
    const data = {
      pageNo,
      size,
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    dispatch(specialtyLoading());
    try {
      const req = await axios.post(
        `${Host}/patient/specialty/get`,
        data,
        config,
      );
      let response = req.data.data;
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      response = response.map((item) => item.name);
      console.log(response);
      dispatch(specialtyLoaded(response));
    } catch (e) {
      console.log(e);
      dispatch(specialtyError(e));
    }
  };
};
