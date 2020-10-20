import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';
import allReducer from '../reducer/index';
import MainNavigationV2 from '../../navigationV2/MainNavigationV2';

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  whitelist: [
    'AuthReducer',
    'PatientReducer',
    'DoctorReducer',
    // 'PatientAccountReducer'
  ],
  //   blacklist: [
  //     'QuestionReducer',
  //     'DoctorReducer',
  //     'MyDoctorReducer',
  //     'AuthReducer.isLoading',
  //   ],
};

const pReducer = persistReducer(persistConfig, allReducer);

const _store = createStore(pReducer, {}, applyMiddleware(thunk, logger));
const store = persistStore(_store);

export default function Store() {
  return (
    <Provider store={_store}>
      <PersistGate loading={null} persistor={store}>
        <MainNavigationV2 />
      </PersistGate>
    </Provider>
  );
}
