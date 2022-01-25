import {lightTheme, darkTheme} from '../constants';
import {
  toggleThemeBegin,
  toggleThemeSuccess,
  toggleThemeFailure,
} from './themeSlice';
export function toggleTheme(themeType) {
  return dispatch => {
    dispatch(toggleThemeBegin());
    switch (themeType) {
      case 'dark':
        dispatch(toggleThemeSuccess({theme: darkTheme}));
        break;
      case 'light':
        dispatch(toggleThemeSuccess({theme: lightTheme}));
        break;
      default:
        dispatch(toggleThemeFailure({error: 'Invalid theme type!'}));
        break;
    }
  };
}
