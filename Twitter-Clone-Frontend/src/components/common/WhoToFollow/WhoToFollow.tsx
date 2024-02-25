import React from 'react';
import './WhoToFollow.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShowMoreButton from '../../shared/ShowMoreButton/ShowMoreButton';
import { selectItemsOfConnectPeople } from '../../../store/ducks/connectPeople/selectors';
import { selectDataOfUser } from '../../../store/ducks/user/selectors';
import { fetchDataOfConnectPeople } from '../../../store/ducks/connectPeople/actionCreators';
import ConnectPerson from '../ConnectPerson/ConnectPerson';

const WhoToFollow: React.FC = () => {
  const dispatch = useDispatch();
  let users = useSelector(selectItemsOfConnectPeople);
  const currentUserData = useSelector(selectDataOfUser);

  if (currentUserData) {
    users = users.filter(item => item._id !== currentUserData._id);
    users = users.slice(0, 4);
  }

  React.useEffect(() => {
    dispatch(fetchDataOfConnectPeople());
  }, []);

  return (
    <div className="follow-block">
      <div className="follow-block-header">
        <span className="trends-block-header__text">Who to follow</span>
      </div>
      <div className="follow-block-list">

        {users.map((item, index) => (
          <ConnectPerson key={index} user={item} isWhoToFollowBlock={true} />
        ))}

        <Link to="/connect_people" className="trends-block__link">
          <ShowMoreButton />
        </ Link>
      </div>
    </div>
  );
};

export default WhoToFollow;
