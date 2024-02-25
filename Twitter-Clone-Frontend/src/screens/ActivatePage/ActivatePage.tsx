import React from 'react';
import { useDispatch } from 'react-redux';
import { AuthApi } from '../../services/api/authApi';
import { setLoadingStatusOfUser } from '../../store/ducks/user/actionCreators';
import { LoadingStatus } from '../../store/types';

export const ActivatePage: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setLoadingStatusOfUser(LoadingStatus.NEVER));
    const hash = window.location.pathname.split('/').pop();
    if (hash) {
      AuthApi.verify(hash)
        .then(({ data }) => {
          window.localStorage.setItem('twitter-clone-token', data.token);
          window.location.href = '/home';
        })
        .catch(() => {
          dispatch(setLoadingStatusOfUser(LoadingStatus.LOADED));
        });
    }
  }, []);

  return null;
};
