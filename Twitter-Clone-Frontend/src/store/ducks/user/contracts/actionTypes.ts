import { Action } from 'redux';
import { IFollowUser, IUpdateDataOfUser, IUser } from './state';
import { LoadingStatus } from '../../../types';
import { IRegisterFormProps } from '../../../../screens/Login/components/RegisterModal';
import { ILoginFormProps } from '../../../../screens/Login/components/LoginModal';

export enum UserActionsType {
  SET_LOADING_STATUS_OF_USER = 'user/SET_LOADING_STATUS_OF_USER',
  FETCH_SIGN_UP = 'user/FETCH_SIGN_UP',
  FETCH_SIGN_IN = 'user/FETCH_SIGN_IN',
  SIGN_OUT = 'user/SIGN_OUT',
  FETCH_DATA_OF_USER = 'user/FETCH_DATA_OF_USER',
  UPDATE_DATA_OF_USER = 'user/UPDATE_DATA_OF_USER',
  SET_DATA_OF_USER = 'user/SET_DATA_OF_USER',
  FOLLOW_USER = 'user/FOLLOW_USER',
}

export interface ISetLoadingStatusOfUserAction extends Action<UserActionsType> {
  type: UserActionsType.SET_LOADING_STATUS_OF_USER;
  payload: LoadingStatus;
}

export interface IFetchSignUpAction extends Action<UserActionsType> {
  type: UserActionsType.FETCH_SIGN_UP,
  payload: IRegisterFormProps,
}

export interface IFetchSignInAction extends Action<UserActionsType> {
  type: UserActionsType.FETCH_SIGN_IN,
  payload: ILoginFormProps,
}

export interface ISignOutAction extends Action<UserActionsType> {
  type: UserActionsType.SIGN_OUT,
}

export interface IFetchDataOfUserAction extends Action<UserActionsType> {
  type: UserActionsType.FETCH_DATA_OF_USER,
}

export interface IUpdateDataOfUserAction extends Action<UserActionsType> {
  type: UserActionsType.UPDATE_DATA_OF_USER,
  payload: IUpdateDataOfUser;
}

export interface ISetDataOfUserAction extends Action<UserActionsType> {
  type: UserActionsType.SET_DATA_OF_USER;
  payload: IUser | undefined;
}

export interface IFollowUserAction extends Action<UserActionsType> {
  type: UserActionsType.FOLLOW_USER;
  payload: IFollowUser;
}

export type UserActions =
  | ISetLoadingStatusOfUserAction
  | IFetchSignUpAction
  | IFetchSignInAction
  | ISignOutAction
  | IFetchDataOfUserAction
  | IUpdateDataOfUserAction
  | ISetDataOfUserAction
  | IFollowUserAction;
