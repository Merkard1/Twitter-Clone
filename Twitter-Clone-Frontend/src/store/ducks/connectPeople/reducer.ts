import produce, { Draft } from "immer";
import { LoadingStatus } from "../../types";
import { ConnectPeopleActions, ConnectPeopleActionsType } from "./contracts/actionTypes";
import { IConnectPeopleState } from "./contracts/state";

const initialConnectPeopleState: IConnectPeopleState = {
  items: [],
  connectPeopleStatus: LoadingStatus.NEVER,
};

export const connectPeopleReducer = produce((draft: Draft<IConnectPeopleState>, action: ConnectPeopleActions) => {
  switch (action.type) {
    case ConnectPeopleActionsType.FETCH_DATA_OF_CONNECT_PEOPLE:
      draft.items = [];
      draft.connectPeopleStatus = LoadingStatus.LOADING;
      break;
    case ConnectPeopleActionsType.SET_DATA_OF_CONNECT_PEOPLE:
      draft.items = action.payload;
      draft.connectPeopleStatus = LoadingStatus.LOADED;
      break;

    default:
      break;
  }
}, initialConnectPeopleState);
