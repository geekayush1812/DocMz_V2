import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useTheme = function () {
  const [theme, setLocalTheme] = useState('PRIMARY');
  const [themeChanged, setThemeChanged] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('theme')
      .then((res) => {
        if (!res) {
          AsyncStorage.setItem('theme', 'PRIMARY')
            .then(() => {
              setThemeChanged(false);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          setLocalTheme(res);
        }
      })
      .catch((e) => {
        console.log('Error:::', e);
      });
  }, [themeChanged]);
  const setTheme = (tm) => {
    AsyncStorage.setItem('theme', tm)
      .then(() => {
        setThemeChanged(true);
        setLocalTheme(tm);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return [theme, setTheme];
};

function Theme() {
  return {
    THEME: {
      PRIMARY: 'PRIMARY',
      DARK: 'DARK',
      MINI: 'MINI',
    },
    useTheme: useTheme,
  };
}

export default new Theme();
