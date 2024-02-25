import axios from '../../core/axios';
import { ITweet, TTweetsOption } from '../../store/ducks/tweets/contracts/state';

interface Response<T> {
  status: string;
  data: T;
}

export const TweetsApi = {
  async fetchDataOfTweets(userId?: string): Promise<ITweet[]> {
    const { data } = await axios.get<Response<ITweet[]>>(
      userId ? `/tweets/user/${userId}` : '/tweets',
    );
    return data.data;
  },

  async fetchDataOfSpecificTweets(payload: TTweetsOption): Promise<ITweet[]> {
    const { data } = await axios.get<Response<ITweet[]>>(`/tweets/${payload}`);
    return data.data;
  },

  async fetchDataOfFavoriteTweets(userId: string): Promise<ITweet[]> {
    const { data } = await axios.get<Response<ITweet[]>>(`/tweets/${userId}/favorite`);
    return data.data;
  },

  async fetchDataOfTweet(id: string): Promise<ITweet> {
    const { data } = await axios.get<Response<ITweet>>(`/tweets/${id}`);
    return data.data;
  },

  async addTweet(payload: { text: string, images: string[], replyingTo?: ITweet, retweet?: ITweet }): Promise<ITweet> {
    const { data } = await axios.post<Response<ITweet>>('/tweets', payload);
    return data.data;
  },

  removeTweet: (id: string): Promise<void> => axios.delete(`tweets/${id}`),

  async likeTweet(id: string): Promise<ITweet> {
    const { data } = await axios.get<Response<ITweet>>(`tweets/${id}/like`);
    return data.data;
  },
};
