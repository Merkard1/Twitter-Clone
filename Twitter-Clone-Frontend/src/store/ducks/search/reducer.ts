import produce, { Draft } from "immer";
import { LoadingStatus } from "../../types";
import { ConnectPeopleActions, SearchActionsType } from "./contracts/actionTypes";
import { ISearchState } from "./contracts/state";

const initialSearchState: ISearchState = {
  searchedUsers: [],
  searchStatus: LoadingStatus.NEVER,
};

export const searchReducer = produce((draft: Draft<ISearchState>, action: ConnectPeopleActions) => {
  switch (action.type) {
    case SearchActionsType.SEARCH_USERS:
      draft.searchedUsers = [];
      draft.searchStatus = LoadingStatus.LOADING;
      break;
    case SearchActionsType.SET_DATA_OF_SEARCH:
      draft.searchedUsers = action.payload;
      draft.searchStatus = LoadingStatus.LOADED;
      break;

    default:
      break;
  }
}, initialSearchState);
