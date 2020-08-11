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
  console.log(data, '----------------', dataVitals);
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

export const resetUserAccountReducer = () => {
  return {
    type: RESET,
  };
};

export const GetPatientInfo = (id) => {
  return (dispatch) => {
    console.log('authAction > GetPatientInfor', id);
    dispatch(startLoading());

    axios
      .get(`${Host}/patient/getinfo/${id}`)
      .then((result) => {
        if (result.status) {
          console.log('user data !! 1', result.data.data.meta);
          const data = result.data.data;
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

export const UploadProfilePic = (id, ImageData) => {
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
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    fetch(`${Host}/patient/upload/image`, config)
      .then((responseStatus) => {
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
        console.log(responseStatus);
        dispatch(profilePicUploaded(Image));
      })
      .catch((err) => {
        console.log(err);
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
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    try {
      const request = await axios.post(
        `${Host}/appointment/cancel`,
        data,
        config,
      );
      console.log('#######################');
      console.log(request.data);
    } catch (e) {
      console.log('******************');
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
