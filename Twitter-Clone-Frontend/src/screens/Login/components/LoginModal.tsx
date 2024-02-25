import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, FormGroup, TextField } from '@material-ui/core';
import { LoadingStatus } from '../../../store/types';
import { selectStatusOfUser } from '../../../store/ducks/user/selectors';
import { fetchSignIn } from '../../../store/ducks/user/actionCreators';
import ModalWindow from '../../../components/shared/ModalWindow/ModalWindow';

interface ILoginModalProps {
  onClose: () => void;
}

export interface ILoginFormProps {
  email: string;
  password: string;
}

const LoginFormSchema = yup.object().shape({
  email: yup.string().email('Неверная почта').required('Ввeдите почту'),
  password: yup.string().min(6, 'Минимальная длина пароля 6 симвлов').required(),
});

const LoginModal: React.FC<ILoginModalProps> = ({
  onClose,
}: ILoginModalProps) => {
  const dispatch = useDispatch();

  const loadingStatus = useSelector(selectStatusOfUser);

  const { control, handleSubmit, errors } = useForm<ILoginFormProps>({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = (data: ILoginFormProps) => {
    dispatch(fetchSignIn(data));
  };

  return (
    <ModalWindow onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl className="login-form-control" component="fieldset" fullWidth>
          <FormGroup aria-label="position" row>
            <Controller
              as={TextField}
              control={control}
              name="email"
              className="login-form__field"
              id="email"
              label="E-Mail"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="email"
              defaultValue=""
              helperText={errors.email?.message}
              error={!!errors.email}
              fullWidth
              autoFocus
            />
            <Controller
              as={TextField}
              control={control}
              name="password"
              className="login-form__field"
              id="password"
              label="Пароль"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              type="password"
              defaultValue=""
              helperText={errors.password?.message}
              error={!!errors.password}
              fullWidth
            />
            <div className="login-form__button-wrapper">
              <button className="login-side__button" disabled={loadingStatus === LoadingStatus.LOADING}>
                Войти
              </button>
            </div>
          </FormGroup>
        </FormControl>
      </form>
    </ModalWindow>
  );
};

export default LoginModal;
