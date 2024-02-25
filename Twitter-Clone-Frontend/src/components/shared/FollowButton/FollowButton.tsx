import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../../store/ducks/user/actionCreators';
import { selectDataOfUser } from '../../../store/ducks/user/selectors';
import './FollowButton.scss';

type TButtonSizes = 'middle' | 'large';

interface IFollowButtonProps {
  size: TButtonSizes;
  followedByMeUserId: string;
}

const FollowButton: React.FC<IFollowButtonProps> = ({
  size,
  followedByMeUserId
}: IFollowButtonProps) => {
  const dispatch = useDispatch();
  const currentUserData = useSelector(selectDataOfUser);
  let isFollowed;
  let options;

  switch (size) {
    case 'large':
      options = {
        width: '70px',
        height: '36px',
        marginTop: '5px',
      };
      break;
    case 'middle':
      options = {
        width: 'auto',
        height: '28px',
      };
      break;
    default:
      break;
  }

  if (currentUserData?.followingUsers) {
    isFollowed = currentUserData.followingUsers.includes(followedByMeUserId.toString());
  }

  const handleClickFollow = () => {
    dispatch(followUser({ followedByMeUserId }));
  };

  return (
    <div className="follow-button">
      {isFollowed ? (
        <button onClick={handleClickFollow} className='followed' style={options}>Following</button>
      ) : (
        <button onClick={handleClickFollow} style={options}>Follow</button>
      )}
    </div>
  );
};

export default FollowButton;
