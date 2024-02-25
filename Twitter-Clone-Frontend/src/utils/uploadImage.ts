import axios from 'axios';

interface IUploadImageReturnProps {
  height: number;
  size: number;
  url: string;
  width: number;
}

export const uploadImage = async (image: File, type: string): Promise<IUploadImageReturnProps> => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('type', type);

  const { data } = await axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
