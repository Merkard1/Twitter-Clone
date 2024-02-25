import axios from "axios";
import { ISearchUsers } from "../../store/ducks/search/contracts/state";
import { IFollowUser, IUpdateDataOfUser, IUser } from "../../store/ducks/user/contracts/state";

interface Response<T> {
  status: string;
  data: T;
}

export const UsersApi = {
  async getPeople(): Promise<IUser[]> {
    const { data } = await axios.get<Response<IUser[]>>('/users');
    return data.data;
  },

  async searchUsers(payload: ISearchUsers): Promise<IUser[]> {
    const { data } = await axios.post<Response<IUser[]>>('/users/search', payload);
    return data.data;
  },

  async getMe(): Promise<IUser> {
    const { data } = await axios.get<Response<IUser>>('/users/me');
    return data.data;
  },

  async updateMe(payload: IUpdateDataOfUser): Promise<IUser> {
    const { data } = await axios.patch<Response<IUser>>('/users/me', payload);
    return data.data;
  },

  async followUser(payload: IFollowUser): Promise<IUser> {
    const { data } = await axios.post<Response<IUser>>('/users/me/follow', payload);
    return data.data;
  },

  async getUserInfo(userId: string): Promise<IUser> {
    const { data } = await axios.get<Response<IUser>>(`/users/${userId}`);
    return data.data;
  },
};
