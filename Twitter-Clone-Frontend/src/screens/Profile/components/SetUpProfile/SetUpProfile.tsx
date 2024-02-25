import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TiCameraOutline } from 'react-icons/ti';
import { FormControl, FormGroup, TextField } from '@material-ui/core';
import { updateDataOfUser } from '../../../../store/ducks/user/actionCreators';
import './SetUpProfile.scss';
import { IUser } from '../../../../store/ducks/user/contracts/state';
import { uploadImage } from '../../../../utils/uploadImage';

interface ISetUpProfileProps {
  userData?: IUser;
  onClose: () => void;
}

export interface ISetUpProfileFormProps {
  background?: File[] | string;
  avatar?: File[] | string;
  fullName?: string;
  biography?: string;
}

const RegisterFormSchema = yup.object().shape({
  fullName: yup.string().min(2, 'Must be not less then 2 characters').max(40, 'Must be not more then 40 characters'),
});

const SetUpProfile: React.FC<ISetUpProfileProps> = ({
  userData,
  onClose,
}: ISetUpProfileProps): React.ReactElement => {
  const dispatch = useDispatch();

  const [avatarImage, setAvatarImage] = useState<string | undefined>(userData?.avatar);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(userData?.background);

  const { control, register, handleSubmit, errors } = useForm<ISetUpProfileFormProps>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const imageHandler = async (image: File, type: string): Promise<string> => {
    const { url } = await uploadImage(image, type);

    return url;
  };

  const imageToUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      return URL.createObjectURL(new Blob([file]));
    }

    return undefined;
  };

  const onSubmit = async (data: ISetUpProfileFormProps) => {
    const avatar = data.avatar?.[0] as File;
    if (avatar) {
      data.avatar = await imageHandler(avatar, 'avatar');
    } else {
      delete (data.avatar);
    }

    const background = data.background?.[0] as File;
    if (background) {
      data.background = await imageHandler(background, 'background');
    } else {
      delete (data.background);
    }

    dispatch(updateDataOfUser(data));
    onClose();
  };

  const onChangeBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
    const blobUrl = imageToUrl(event);
    setBackgroundImage(blobUrl);
  };

  const onChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const blobUrl = imageToUrl(event);
    setAvatarImage(blobUrl);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl className="form-control" component="fieldset" fullWidth>
        <div className="form-file">
          <label
            className="form-file__background"
            htmlFor="background"
            style={{ background: backgroundImage ? `url(${backgroundImage})` : 'rgb(203, 214, 220)' }}
          >
            <TiCameraOutline className="form-file__icon" />
          </label>
          <input
            type="file"
            accept="image/*"
            ref={register}
            name="background"
            id="background"
            onChange={onChangeBackground}
          />
          <label
            className="form-file__avatar"
            htmlFor="avatar"
            style={{ background: avatarImage ? `url(${avatarImage})` : 'rgb(170, 186, 194)' }}
          >
            <TiCameraOutline className="form-file__icon" />
          </label>
          <input
            type="file"
            accept="image/*"
            ref={register}
            name="avatar"
            id="avatar"
            onChange={onChangeAvatar}
          />
        </div>
        <FormGroup aria-label="position" row>
          <Controller
            as={TextField}
            control={control}
            name="fullName"
            className="form__field"
            id="fullName"
            label="Name"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            type="text"
            defaultValue={userData?.fullName || ''}
            helperText={errors.fullName?.message}
            error={!!errors.fullName}
            fullWidth
          />
          <Controller
            as={TextField}
            control={control}
            name="biography"
            className="form__field"
            id="biography"
            label="Bio"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            type="text"
            defaultValue={userData?.biography || ''}
            multiline
            rows={4}
            fullWidth
          />
          <div className="form__button-wrapper">
            <button
              className="form__button"
              type="submit">
              Save
            </button>
          </div>
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default SetUpProfile;
