import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { BackButton } from '../../components/shared/BackButton/BackButton';
import ConnectPerson from '../../components/common/ConnectPerson/ConnectPerson';
import { fetchDataOfConnectPeople } from '../../store/ducks/connectPeople/actionCreators';
import { selectItemsOfConnectPeople } from '../../store/ducks/connectPeople/selectors';
import { selectDataOfUser } from '../../store/ducks/user/selectors';
import ThemeToggle from '../../components/shared/ThemeToggle/ThemeToggle';

const ConnectPeople: React.FC = () => {
  const dispatch = useDispatch();
  let users = useSelector(selectItemsOfConnectPeople);
  const currentUserData = useSelector(selectDataOfUser);
  if (currentUserData) {
    users = users.filter(item => item._id !== currentUserData._id);
  }

  React.useEffect(() => {
    dispatch(fetchDataOfConnectPeople());
  }, []);

  return (
    <div className="connect-people-wrapper">
      <div className="connect-people-header">
        <span className="connect-people-header__title"><BackButton />Connect</span>
        <ThemeToggle />
      </div>
      <div className="connect-people-header sub-header">
        <span className="connect-people-header__title">Suggested for you</span>
      </div>

      <Route path="/connect_people" exact>
        {users.map(item => (
          <ConnectPerson key={item._id} user={item} />
        ))}
      </Route>
    </div>
  );
};

export default ConnectPeople;
