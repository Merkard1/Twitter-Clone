import axios from 'axios';
import { ITagsState } from '../../store/ducks/tags/contracts/state';

export const TagsApi = {
  async fetchTags(): Promise<ITagsState['items']> {
    const { data } = await axios.get('/tags');
    return data;
  },
};
