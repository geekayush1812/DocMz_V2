import axios from 'axios';
import {Host} from '../../utils/connection';

const SAVE = 'SAVE_PATIENT_INFO';
const ERRORS = 'HAVEING_ERROR_IN_PATIENT_ACCOUNT_REDUCER';
const LOADING = 'START_PATIENT_ACCOUNT_LOADING';
const RESET = 'RESET_PATIENT_ACCOUNT_REDUCER';
const SAVE_FEV_DOC = 'SAVE_PATIENT_FEV_DOC';
const SAVE_FAMILY_MEMBER = 'SAVE_PATIENT_FAMILY_MEMBER';
const PROFILE_PIC_UPLOADED = 'PROFILE_PIC_UPLOADED';
const START_APPOINTMENT_SLOT_LOADING = 'START_APPOINTMENT_SLOT_LOADING';
const APPOINTMENT_SLOT_LOADED = 'APPOINTMENT_SLOT_LOADED';
const APPOINTMENT_SLOT_ERROR = 'APPOINTMENT_SLOT_ERROR';
const BOOKING_APPOINTMENT = 'BOOKING_APPOINTMENT';
const BOOKED_APPOINTMENT = 'BOOKED_APPOINTMENT';
const ERROR_BOOKING_APPOINTMENT = 'ERROR_BOOKING_APPOINTMENT';

const RECORDS_UPLOADING = 'RECORDS_UPLOADING';
const RECORDS_UPLOADED = 'RECORDS_UPLOADED';
const RECORDS_UPLOADING_ERROR = 'RECORDS_UPLOADING_ERROR';

const saveUserAccount = (data, dataVitals) => {
  return {
    type: SAVE,
    payload: data,
    medInfo: dataVitals,
  };
};

const saveFevDoc = (data) => {
  return {
    type: SAVE_FEV_DOC,
    payload: data,
  };
};

const saveFamilyMember = (data) => {
  return {
    type: SAVE_FAMILY_MEMBER,
    payload: data,
  };
};

const startLoading = () => {
  return {
    type: LOADING,
  };
};

const havingError = (err) => {
  return {
    type: ERRORS,
    payload: err,
  };
};

const profilePicUploaded = (data) => {
  return {
    type: PROFILE_PIC_UPLOADED,
    payload: data,
  };
};

const startAppointmentSlotLoading = () => {
  return {
    type: START_APPOINTMENT_SLOT_LOADING,
  };
};
const appointmentSlotLoaded = (appointmentSlot) => {
  return {
    type: APPOINTMENT_SLOT_LOADED,
    payload: appointmentSlot,
  };
};
const appointmentSlotError = (error) => {
  return {
    type: APPOINTMENT_SLOT_ERROR,
    payload: error,
  };
};

const bookingAppointment = () => {
  return {
    type: BOOKING_APPOINTMENT,
  };
};
const bookedAppointment = (data) => {
  return {
    type: BOOKED_APPOINTMENT,
    payload: data,
  };
};
const errorBookingAppointment = (err) => {
  return {
    type: ERROR_BOOKING_APPOINTMENT,
    payload: err,
  };
};

const uploadingRecords = () => {
  return {
    type: RECORDS_UPLOADING,
  };
};

const uploadedRecords = (data) => {
  return {
    type: RECORDS_UPLOADED,
    payload: data,
  };
};
const errorUploadingRecords = (err) => {
  return {
    type: RECORDS_UPLOADING_ERROR,
    payload: err,
  };
};

/**
 *   medicine actions
 */

const ADD_MEDICINE_LOADING = 'ADD_MEDICINE_LOADING';
const MEDICINE_ADDED = 'MEDICINE_ADDED';
const ADD_MEDICINE_ERROR = 'ADD_MEDICINE_ERROR';
const GETTING_MEDICINE = 'GETTING_MEDICINE';
const DONE_GETTING_MEDICINE = 'DONE_GETTING_MEDICINE';
const ERROR_GETTING_MEDICINE = 'ERROR_GETTING_MEDICINE';

const addingMedicine = () => {
  return {
    type: ADD_MEDICINE_LOADING,
  };
};
const medicineAdded = () => {
  return {
    type: MEDICINE_ADDED,
  };
};
const addingMedicineError = (e) => {
  return {
    type: ADD_MEDICINE_ERROR,
    payload: e,
  };
};
const gettingMedicine = () => {
  return {
    type: GETTING_MEDICINE,
  };
};
const doneGettingMedicine = (medicines) => {
  return {
    type: DONE_GETTING_MEDICINE,
    payload: medicines,
  };
};
const errorGettingMedicine = (e) => {
  return {
    type: ERROR_GETTING_MEDICINE,
    payload: e,
  };
};

export const GetMedicine = (metaId) => (dispatch) => {
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(gettingMedicine());
  axios
    .get(`${Host}/medicine/get/${metaId}`, config)
    .then((res) => {
      if (res.data.status) {
        dispatch(doneGettingMedicine(res.data.data));
      } else {
        throw new Error('Internal error.Try again!!');
      }
    })
    .catch((e) => {
      dispatch(errorGettingMedicine(e));
    });
};

export const AddMedicine = (data) => (dispatch) => {
  //data:{metaId,medicines}
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(addingMedicine());
  axios
    .post(`${Host}/medicine/addbypatient`, data, config)
    .then((res) => {
      if (res.data.status) {
        dispatch(medicineAdded());
        dispatch(GetMedicine(data.metaId));
      } else {
        throw new Error('Internal error.Try again!!');
      }
    })
    .catch((e) => {
      dispatch(addingMedicineError(e));
    });
};

/**
 *   END MEDICINE ACTIONS
 */

/**
 *  Appointment list Action
 */

const GETTING_APPOINTMENT_LIST = 'GETTING_APPOINTMENT_LIST';
const GOT_APPOINTMENT_LIST = 'GOT_APPOINTMENT_LIST';
const ERROR_GETTING_APPOINTMENT = 'ERROR_GETTING_APPOINTMENT';

const gettingAppointments = () => {
  return {
    type: GETTING_APPOINTMENT_LIST,
  };
};
const gotAppointments = (appointments) => {
  return {
    type: GOT_APPOINTMENT_LIST,
    payload: appointments,
  };
};
const errorGettingAppointments = (e) => {
  return {
    type: ERROR_GETTING_APPOINTMENT,
    payload: e,
  };
};

export const GetAppointments = (patientId) => (dispatch) => {
  dispatch(gettingAppointments());
  axios
    .get(`${Host}/patient/appointments/${patientId}`)
    .then((response) => {
      const {data, status} = response.data;
      if (status) {
        dispatch(gotAppointments(data));
      } else throw new Error('Internal Error!! Try again.');
    })
    .catch((e) => {
      dispatch(errorGettingAppointments(e));
    });
};

/**
 *  End Appointment list
 */

/**
 *  Recent doctor Action
 */

const GETTING_RECENT_DOCTORS = 'GETTING_RECENT_DOCTORS';
const GOT_RECENT_DOCTOR = 'GOT_RECENT_DOCTOR';
const ERROR_GETTING_RECENT_DOCTOR = 'ERROR_GETTING_RECENT_DOCTOR';

const gettingRecentDoctor = () => ({
  type: GETTING_RECENT_DOCTORS,
});
const gotRecentDoctor = (recentDoctors) => ({
  type: GOT_RECENT_DOCTOR,
  payload: recentDoctors,
});
const errorGettingRecentDoctor = (e) => ({
  type: ERROR_GETTING_RECENT_DOCTOR,
  payload: e,
});

export const GetRecentDoctor = (patientId) => (dispatch) => {
  dispatch(gettingRecentDoctor());
  axios
    .get(`${Host}/patient/recentdoctors/${patientId}`)
    .then((res) => {
      const {status, data} = res.data;
      if (status) dispatch(gotRecentDoctor(data));
      else throw new Error('Internal Error!!');
    })
    .catch((e) => {
      dispatch(errorGettingRecentDoctor(e));
    });
};

/**
 *  End Recent doctor action
 */

export const resetUserAccountReducer = () => {
  return {
    type: RESET,
  };
};

export const GetPatientInfo = (id) => {
  return (dispatch) => {
    dispatch(startLoading());

    axios
      .get(`${Host}/patient/getfullinfo/${id}`)
      .then((result) => {
        if (result.data.status) {
          const data = result.data.data;
          dispatch(saveUserAccount(data, data.meta));
        } else {
          throw new Error('Internal Error!!');
        }
      })
      .catch((err) => {
        dispatch(havingError(err));
      });
  };
};

export const UpdateVitals = (response, userID, metaId) => {
  return (dispatch) => {
    dispatch(startLoading());
    const _data = {
      id: userID,
      meta: metaId,
      ...response,
    };
    axios
      .post(`${Host}/patient/medicalInfo/add`, _data)
      .then((result) => {
        if (result.status) {
          console.log('user data !! 3', result);
          axios
            .get(`${Host}/patient/getinfo/${userID}`)
            .then((result2) => {
              if (result2.status) {
                console.log('user data !! 1', result2.data.data.meta);
                const data = result2.data.data;
                // GetPatientVitalInfo(result.data.data);
                // dispatch(saveUserAccount(result.data.data));
                axios
                  .post(`${Host}/patient/meta/get`, {
                    id: data.meta,
                  })
                  .then((res) => {
                    if (res.status) {
                      console.log('user data !! 2', res);
                      dispatch(saveUserAccount(data, res.data.data));
                    }
                  })
                  .catch((err) => {
                    console.log('user data !! 2 error');

                    dispatch(havingError(err));
                  });
              }
            })
            .catch((err) => {
              console.log('user data !! 1 error');
              dispatch(havingError(err));
            });
          alert('Successfully Updated Profile.');
        }
      })
      .catch((err) => {
        dispatch(havingError(err));
      });
  };
};

export const GetFevDoc = (docId) => {
  return async (dispatch) => {
    const preAdd = {
      specialty: 788,
      city: 'New York',
      _id: docId,
    };

    await axios
      .post(`${Host}/doctors/search`, preAdd)
      .then((res) => {
        console.log('************** patientAccotioon **********');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const AddFevDoc = (docId, patientId) => {
  return async (dispatch) => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const _data = {
      id: patientId,
      docId: docId,
    };

    await axios
      .post(`${Host}/patient/favourite/add`, _data, config)
      .then((result) => {
        if (result.status) {
          console.log('Successfully Add your fev doctor.');
          GetPatientInfo(patientId);
        }
      })
      .catch((err) => {
        dispatch(havingError(err));
      });
  };
};

export const UpdateProfile = (profileData, patientId) => {
  return async (dispatch) => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const _data = {
      id: patientId,
      ...profileData,
    };
    console.log('$$$$$$$$$', profileData, patientId, _data);

    await axios
      .post(`${Host}/patient/update`, _data, config)
      .then((result) => {
        if (result.status) {
          alert('Successfully Updated Profile.');
          GetPatientInfo(patientId);
        }
      })
      .catch((err) => {
        dispatch(havingError(err));
      });
  };
};

export const RemoveFevDoc = (docId, patientId) => {
  return async (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const _data = {
      id: patientId,
      docId: docId,
    };

    try {
      const request = axios.post(
        `${Host}/patient/favourite/remove`,
        _data,
        config,
      );
      console.log(request);
      dispatch(GetPatientInfo(patientId));
    } catch (e) {
      console.log(e);
    }
  };
};

export const GetFamilyMember = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    console.log(id);

    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const _data = {
      metaId: id, //"5eb31e07e078c64910b9d29e",
      // metaId: '5eb31e07e078c64910b9d29e',
    };

    axios
      .post(`${Host}/patient/member/get`, _data, config)
      .then((res) => {
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
        console.log(res.data);
        dispatch(saveFamilyMember(res.data.data.members));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const AddFamilyMember = (obj, success, faild) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    // obj.metaId = '5eb31e07e078c64910b9d29e';

    await axios
      .post(`${Host}/patient/member/add`, obj, config)
      .then((result) => {
        if (result.status) {
          console.log('Successfully Add your Family member.');
          success();
          GetFamilyMember(obj.metaId);
        }
      })
      .catch((err) => {
        dispatch(havingError(err));
      });
  };
};

export const RemoveFamilyMember = (docId, patientId) => {
  return async (dispatch) => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const _data = {
      id: patientId,
      docId: docId,
    };

    await axios
      .post(`${Host}/patient/favourite/remove`, _data, config)
      .then((result) => {
        if (result.status) {
          console.log('Successfully remove fev doctor.');
          GetPatientInfo(patientId);
        }
      })
      .catch((err) => {
        dispatch(havingError(err));
      });
  };
};

export const UploadProfilePicPatient = (id, ImageData) => {
  return (dispatch) => {
    dispatch(startLoading());
    const Image = {
      uri: ImageData.uri,
      type: ImageData.type,
      name: ImageData.fileName,
    };
    const data = new FormData();
    data.append('myFile', Image);
    data.append('id', id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${Host}/patient/upload/image`, data, config)
      .then((responseStatus) => {
        dispatch(profilePicUploaded(Image));
      })
      .catch((err) => {
        dispatch(havingError(err));
      });
  };
};

export const GetAppointmentSlot = (dates, id) => {
  return async (dispatch) => {
    dispatch(startAppointmentSlotLoading());
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const data = {
      dates,
      id,
    };
    await axios
      .post(`${Host}/doctors/appointment/date`, data, config)
      .then((result) => {
        if (result.status) {
          const response = result.data.data;
          if (response.length) {
            dispatch(appointmentSlotLoaded(response));
          } else {
            dispatch(appointmentSlotError(''));
          }
        }
      })
      .catch((err) => {
        dispatch(appointmentSlotError(err));
      });
  };
};

export const bookAppointment = (data) => {
  return async (dispatch) => {
    dispatch(bookingAppointment());
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    await axios
      .post(`${Host}/appointment/book`, data, config)
      .then((result) => {
        if (result.status) {
          dispatch(bookedAppointment(result.message));
        } else {
          dispatch(errorBookingAppointment(''));
        }
      })
      .catch((err) => {
        dispatch(errorBookingAppointment(err));
      });
  };
};

export const RemoveAppointment = (data) => {
  return async (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    try {
      const request = await axios.post(
        `${Host}/appointment/cancel`,
        data,
        config,
      );
    } catch (e) {
      console.log(e);
    }
  };
};

export const UploadRecords = (fileData) => {
  return (dispatch) => {
    dispatch(uploadingRecords());
    let data = new FormData();
    data.append('file', fileData.file);
    data.append('document', fileData.document);
    data.append('description', fileData.description);
    data.append('id', fileData.id);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${Host}/patient/upload/records`, data, config)
      .then((response) => {
        dispatch(uploadedRecords(response));
      })
      .catch((err) => {
        dispatch(errorUploadingRecords(err));
      });
  };
};
