import axios from 'axios';
import {Host} from '../../utils/connection';
import AsyncStorage from '@react-native-community/async-storage';

const GET_DOCTORS = 'GET_DOCTORS';
const GET_MORE_DOCTORS = 'GET_MORE_DOCTORS';
const GETTING_MORE_DOCTORS = 'GETTING_MORE_DOCTORS';
const GETTING_DOCTORS = 'GETTING_DOCTORS';
const ERROR = 'ERROR';
const RESET_DOCTOR = 'RESET_DOCTOR';
const TMP_DOC_STORE = 'TMP_DOC_STORE';
const SEARCHING_DOCTORS = 'SEARCHING_DOCTORS';
const SEARCHED_DOCTORS = 'SEARCHED_DOCTORS';
const GETTING_SUPER_DOC = 'GETTING_SUPER_DOCS';
const SUPER_DOCS = 'SUPER_DOCS';
const UPLOADING_IMAGE = 'UPLOADING_IMAGE';
const UPLOADED_IMAGE = 'UPLOADED_IMAGE';
const ERROR_UPLOADING_IMAGE = 'ERROR_UPLOADING_IMAGE';

const setDoctors = (doctors, searchable) => {
  return {
    type: GET_DOCTORS,
    isSearching: searchable,
    payload: doctors,
  };
};
const setMoreDoctors = (doctors) => {
  return {
    type: GET_MORE_DOCTORS,
    payload: doctors,
  };
};
const startDoctorLoading = () => {
  return {
    type: GETTING_DOCTORS,
  };
};
const startMoreDoctorLoading = () => {
  return {
    type: GETTING_MORE_DOCTORS,
  };
};
const haveingError = (error) => {
  return {
    type: ERROR,
    error: error,
  };
};

const tempDocStore = (data) => {
  return {
    type: TMP_DOC_STORE,
    payload: data,
  };
};

const searchingDoctors = () => {
  return {
    type: SEARCHING_DOCTORS,
  };
};

const setSearchedDoctors = (data) => {
  return {
    type: SEARCHED_DOCTORS,
    payload: data,
  };
};

const superDocLoading = () => {
  return {
    type: GETTING_SUPER_DOC,
  };
};

const setSuperDoc = (data) => {
  return {
    type: SUPER_DOCS,
    payload: data,
  };
};

const startUploadingImage = () => {
  return {
    type: UPLOADING_IMAGE,
  };
};
const uploadedImage = () => {
  return {
    type: UPLOADED_IMAGE,
  };
};
const errorUploadingImage = (e) => {
  return {
    type: ERROR_UPLOADING_IMAGE,
    payload: e,
  };
};

export const resetDoctor = () => {
  return {
    type: RESET_DOCTOR,
  };
};

// export const fetchDoctors = () => {
//   return async dispatch => {
//     await dispatch(startDoctorLoading());
//     await axios
//       .get('https://jsonplaceholder.typicode.com/comments')
//       .then(response => {
//         console.log(response);
//         dispatch(setDoctors(response.data));
//       })
//       .catch(err => {
//         dispatch(haveingError(err));
//       });
//   };
// };

//ex: search: '', page: 1, mode: false
export const fetchDoctorLite = (search = {}, _page, mode) => {
  console.log(`Search: ${search} and page: ${_page} and mode: ${mode}`);
  return (dispatch) => {
    const params = {
      match: JSON.stringify({
        is_superDoc: mode,
        ...search,
      }),
      pageNo: _page.toString(),
      size: '5',
      // name: 'sanj',
      // name: search.toString().split(' ')[0],
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startDoctorLoading());
    let searchable = search.length !== 0;
    console.log(searchable);

    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        if (result.status) {
          console.log(result.data.data);
          dispatch(setDoctors(result.data.data, searchable));
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};

export const fetchMoreDoctorLite = (search = {}, _page, mode) => {
  console.log('$$$$$$$$$$$$$$$$$$$$$$');
  console.log(search);
  console.log(_page);
  console.log(mode);
  return (dispatch) => {
    const params = {
      match: JSON.stringify({
        is_superDoc: mode,
        ...search,
      }),
      pageNo: _page.toString(),
      size: '5',
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    dispatch(startMoreDoctorLoading());

    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        console.log(result);
        if (result.status) {
          dispatch(setMoreDoctors(result.data.data));
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};

export const GettingDoctorProfiles = (id) => {
  return (dispatch) => {
    dispatch(startDoctorLoading());
    axios
      .get(`${Host}/doctors/getdoc/${id}`)
      .then((result) => {
        if (result.status) {
          dispatch(tempDocStore(result.data.data));
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};

export const searchDoctors = (search, page) => {
  return (dispatch) => {
    const params = {
      match: JSON.stringify({}),
      pageNo: page.toString(),
      name: search,
      size: '5',
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(searchingDoctors());
    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        if (result.status) {
          dispatch(setSearchedDoctors(result.data.data));
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};

export const fetchSuperDoc = (page, size) => {
  return (dispatch) => {
    const params = {
      match: JSON.stringify({
        is_superDoc: true,
      }),
      pageNo: page.toString(),
      size: size || '5',
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(superDocLoading());
    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        if (result.status) {
          dispatch(setSuperDoc(result.data.data));
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};

export const UploadProfilePic = (id, ImageData) => {
  return (dispatch) => {
    dispatch(startUploadingImage());
    const Image = {
      uri: ImageData.uri,
      type: ImageData.type,
      name: ImageData.fileName,
    };
    const data = new FormData();
    data.append('image', Image);
    data.append('id', id);
    // const config = {
    //   Accept: '*/*',
    //   'content-type': 'multipart/form-data',
    // };
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    console.log('ppppppppppppppppppppppppppppppppp');
    console.log(data);
    console.log(config);
    console.log(`${Host}/doctors/upload/image`);
    axios
      .post(`${Host}/doctors/upload/image`, data, config)
      .then((responseStatus) => {
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
        console.log(responseStatus);
        // AsyncStorage.setItem('ProfileImage', Image)
        //   .then((res) => {
        dispatch(uploadedImage());
        // })
        // .catch(() => {
        //   console.log('error in async storage');
        // });
      })
      .catch((err) => {
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        console.log(JSON.stringify(err));
        dispatch(errorUploadingImage(err));
      });
  };
};
