import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDataOfUser, signOut } from '../../store/ducks/user/actionCreators';

export interface IUseProvideAuth {
  isAuthenticated: () => void | boolean;
  logOut: () => void;
  updateCurrentUserState: () => void;
}

export function useProvideAuth(): IUseProvideAuth {
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = () => {
    let isAuthed = false;
    const currentUser = localStorage.getItem('twitter-clone-currentUser');
    if (currentUser && currentUser !== 'undefined') {
      isAuthed = !!JSON.parse(currentUser);
      if (isAuthed && history.location.pathname === '/login') {
        history.push('/home');
      } else if (isAuthed) {
        return isAuthed;
      }
    }
    return undefined;
  };

  const logOut = () => {
    window.localStorage.removeItem('twitter-clone-token');
    window.localStorage.removeItem('twitter-clone-currentUser');
    dispatch(signOut());
    history.push('/login');
  };

  const updateCurrentUserState = () => {
    dispatch(fetchDataOfUser());
  };

  return ({
    isAuthenticated,
    logOut,
    updateCurrentUserState,
  });
}
