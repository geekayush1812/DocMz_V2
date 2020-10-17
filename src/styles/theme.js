import {useDispatch, useSelector} from 'react-redux';
import {changingTheme, themeChanged} from '../reduxV2/action/AuthAction';
const useTheme = function () {
  const dispatch = useDispatch();
  const setTheme = (tm) => {
    dispatch(changingTheme());
    dispatch(themeChanged(tm));
  };
  return setTheme;
};

export default useTheme;
