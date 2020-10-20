import axios from 'axios';
import {Host} from '../../utils/connection';

/**
 *  ====================== Reset Question =============================
 */

const RESET_QUESTINNAIRE_REDUCER = 'RESET_QUESTINNAIRE_REDUCER';

export const resetQuestinnaireReducer = () => ({
  type: RESET_QUESTINNAIRE_REDUCER,
});

/**
 *  ====================== Reset Question END=============================
 */

/**
 *  ====================== Adding Question =============================
 */
const ADDING_QUESTIONNAIRE = 'ADDING_QUESTIONNAIRE';
const QUESTIONNAIRE_ADDED = 'QUESTIONNAIRE_ADDED';
const ERROR_ADDING_QUESTIONNAIRE = 'ERROR_ADDING_QUESTIONNAIRE';

const startLoading = () => {
  return {
    type: ADDING_QUESTIONNAIRE,
  };
};
const questionnaireAdded = (data) => {
  return {
    type: QUESTIONNAIRE_ADDED,
    payload: data,
  };
};
const errorAddingQuestionnaire = (err) => {
  return {
    type: ERROR_ADDING_QUESTIONNAIRE,
    payload: err,
  };
};
export const AddQuestion = (question) => {
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startLoading());
    const _data = question;
    axios
      .post(`${Host}/questionnaire/add`, _data, config)
      .then((res) => {
        console.log('#######mmmmmmmmmmmmmm###########mmmmmmmmm#######');
        console.log(res.data);
        dispatch(questionnaireAdded(res.data));
      })
      .catch((e) => {
        console.log('!!!!!!!!!@@@@@@@@@@########$$$$$$$$$$');
        dispatch(errorAddingQuestionnaire(e));
        console.log(e);
      });
  };
};

/**
 *  ====================== Adding Question END =============================
 */

/**
 *  ====================== Getting Question =============================
 */
const GETTING_QUESTIONNAIRE = 'GETTING_QUESTIONNAIRE';
const GOT_QUESTIONNAIRE = 'GOT_QUESTIONNAIRE';
const ERROR_GETTING_QUESTIONNAIRE = 'ERROR_GETTING_QUESTIONNAIRE';

const starGettingQuestionnaire = () => {
  return {
    type: GETTING_QUESTIONNAIRE,
  };
};

const gotQuestionnaire = (questions) => {
  return {
    type: GOT_QUESTIONNAIRE,
    payload: questions,
  };
};

const errorGettingQuestionnaire = (err) => {
  return {
    type: ERROR_GETTING_QUESTIONNAIRE,
    payload: err,
  };
};

export const GetQuestion = (id) => {
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(starGettingQuestionnaire());
    const _data = {id};
    axios
      .post(`${Host}/questionnaire/get`, _data, config)
      .then((res) => {
        if (res.status) {
          const questions = res.data.question.filter((item) => item);
          dispatch(gotQuestionnaire(questions));
        } else {
          console.log(res);
          dispatch(errorGettingQuestionnaire(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorGettingQuestionnaire(err));
      });
  };
};

/**
 *  ====================== Getting Question END =============================
 */

/**
 *  ====================== UPDATE Question =============================
 */
export const UpdateQuestion = (question) => {
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startLoading());
    const _data = question;
    axios
      .post(`${Host}/questionnaire/update`, _data, config)
      .then((res) => {
        console.log('#######mmmmmmmmmmmmmm###########mmmmmmmmm#######');
        console.log(res.data);
        dispatch(questionnaireAdded(res.data));
      })
      .catch((e) => {
        console.log('!!!!!!!!!@@@@@@@@@@########$$$$$$$$$$');
        dispatch(errorAddingQuestionnaire(e));
        console.log(e);
      });
  };
};
/**
 *  ====================== UPDATE Question END =============================
 */

/**
 *  ====================== DELETE Question =============================
 */

const DELETING_QUESTION = 'DELETING_QUESTION';
const QUESTION_DELETED = 'QUESTION_DELETED';
const ERROR_DELETING_QUESTION = 'ERROR_DELETING_QUESTION';

const startDeleting = () => {
  return {
    type: DELETING_QUESTION,
  };
};

const questionDeleted = () => {
  return {
    type: QUESTION_DELETED,
  };
};
const errorDeletingQuestion = (err) => {
  return {
    type: ERROR_DELETING_QUESTION,
    payload: err,
  };
};

export const DeleteRootQuestion = (question) => {
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startDeleting());
    const _data = question;
    axios
      .post(`${Host}/questionnaire/delete/root`, _data, config)
      .then((res) => {
        dispatch(questionDeleted());
      })
      .catch((e) => {
        console.log('!!!!!!!!!@@@@@@@@@@########$$$$$$$$$$');
        dispatch(errorDeletingQuestion(e));
        console.log(e);
      });
  };
};

/**
 *  ====================== DELETE Question END=============================
 */
