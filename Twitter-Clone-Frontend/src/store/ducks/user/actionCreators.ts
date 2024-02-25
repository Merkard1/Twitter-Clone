import { ILoginFormProps } from '../../../screens/Login/components/LoginModal';
import { IRegisterFormProps } from '../../../screens/Login/components/RegisterModal';
import {
  IFetchSignInAction,
  IFetchSignUpAction,
  IFetchDataOfUserAction,
  ISetLoadingStatusOfUserAction,
  ISetDataOfUserAction,
  ISignOutAction,
  UserActionsType,
  IUpdateDataOfUserAction,
  IFollowUserAction,
} from './contracts/actionTypes';
import { IFollowUser, IUpdateDataOfUser, IUserState } from './contracts/state';

export const setLoadingStatusOfUser = (payload: IUserState['loadingStatus']): ISetLoadingStatusOfUserAction => ({
  type: UserActionsType.SET_LOADING_STATUS_OF_USER,
  payload,
});

export const fetchSignUp = (payload: IRegisterFormProps): IFetchSignUpAction => ({
  type: UserActionsType.FETCH_SIGN_UP,
  payload,
});

export const fetchSignIn = (payload: ILoginFormProps): IFetchSignInAction => ({
  type: UserActionsType.FETCH_SIGN_IN,
  payload,
});

export const signOut = (): ISignOutAction => ({
  type: UserActionsType.SIGN_OUT,
});

export const fetchDataOfUser = (): IFetchDataOfUserAction => ({
  type: UserActionsType.FETCH_DATA_OF_USER,
});

export const updateDataOfUser = (payload: IUpdateDataOfUser): IUpdateDataOfUserAction => ({
  type: UserActionsType.UPDATE_DATA_OF_USER,
  payload,
});

export const setDataOfUser = (payload: IUserState['data']): ISetDataOfUserAction => ({
  type: UserActionsType.SET_DATA_OF_USER,
  payload,
});

export const followUser = (payload: IFollowUser): IFollowUserAction => ({
  type: UserActionsType.FOLLOW_USER,
  payload,
});
