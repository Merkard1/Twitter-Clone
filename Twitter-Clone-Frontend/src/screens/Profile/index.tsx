/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import enLang from 'date-fns/locale/en-GB';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box, Typography } from '@material-ui/core';
import { BsCalendar } from 'react-icons/bs';
import { selectDataOfUser } from '../../store/ducks/user/selectors';
import { fetchDataOfTweets } from '../../store/ducks/tweets/actionCreators';
import { selectItemsOfTweets, selectStatusOfTweetsIsLoading } from '../../store/ducks/tweets/selectors';
import { IUser } from '../../store/ducks/user/contracts/state';
import './index.scss';
import { BackButton } from '../../components/shared/BackButton/BackButton';
import Tweet from '../../components/common/Tweet/Tweet';
import ModalWindow from '../../components/shared/ModalWindow/ModalWindow';
import SetUpProfile from './components/SetUpProfile/SetUpProfile';
import Avatar from '../../components/shared/Avatar/Avatar';
import FollowButton from '../../components/shared/FollowButton/FollowButton';
import { ITweet } from '../../store/ducks/tweets/contracts/state';
import { TweetsApi } from '../../services/api/tweetsApi';
import { selectLoadingStatusOfTweet } from '../../store/ducks/tweet/selectors';
import { LoadingStatus } from '../../store/types';
import { UsersApi } from '../../services/api/usersApi';
import ThemeToggle from '../../components/shared/ThemeToggle/ThemeToggle';
import CircularProgress from '../../components/shared/CircularProgress/CircularProgress';

type TParams = { id: string };

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={4}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Profile: React.FC = () => {
  const { id } = useParams<TParams>();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);
  const [userData, setUserData] = React.useState<IUser | undefined>();
  const [userFavoriteTweets, setUserFavoriteTweets] = React.useState<ITweet[] | undefined>();
  const [visibleSetUpModal, setVisibleSetUpModal] = React.useState<boolean>(false);
  const isLoading = useSelector(selectStatusOfTweetsIsLoading);
  const currentUserData = useSelector(selectDataOfUser);
  const tweets = useSelector(selectItemsOfTweets);
  const loadingStatusOfTweet = useSelector(selectLoadingStatusOfTweet);

  React.useEffect(() => {
    if (id) {
      if (id === currentUserData?._id) setUserData(currentUserData);
      else UsersApi.getUserInfo(id).then(data => setUserData(data));
    }
  }, [currentUserData, id]);

  React.useEffect(() => {
    if (userFavoriteTweets === undefined || loadingStatusOfTweet === LoadingStatus.LOADING) {
      TweetsApi.fetchDataOfFavoriteTweets(id).then((data) => {
        setUserFavoriteTweets(data);
      });
    }

  }, [loadingStatusOfTweet]);

  React.useEffect(() => {
    dispatch(fetchDataOfTweets());
  }, [id]);

  const handleClickOpenSetUpModal = () => {
    setVisibleSetUpModal(true);
  };

  const handleCloseSetUpModal = () => {
    setVisibleSetUpModal(false);
  };

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-header-wrapper">
          <BackButton />
          <div className="profile-header-container">
            <span className="profile-header__title">{userData?.fullName}</span>
            <span className="profile-header__quantity">{tweets.length} Tweets</span>
          </div>
        </div>
        <ThemeToggle />
      </div>
      <div className="profile-user">
        <div className="profile-user-background">
          {userData?.background && <img src={userData.background} alt="Header background" />}
        </div>
        <div className="profile-user-info">
          <div className="profile-user-header">
            <div className="profile-user-avatar">
              <Avatar
                size='large'
                fullName={userData?.fullName}
                avatar={userData?.avatar}
                id={userData?._id}
                response={true}
              />
            </div>
            <div className="profile-user-buttons">

              {id === currentUserData?._id ? (
                <button onClick={handleClickOpenSetUpModal}>Set up profile</button>
              ) : (
                <FollowButton size='large' followedByMeUserId={id} />
              )}
            </div>
          </div>

          <div className="profile-user-fullname">{userData?.fullName}</div>
          <div className="profile-user-username">@{userData?.username}</div>
          <div className="profile-user-biography">{userData?.biography}</div>
          {
            userData?.createdAt && <div className="profile-user-joined-date">
              <BsCalendar />Joined {format(new Date(userData.createdAt), 'MMMM y', { locale: enLang })}
            </div>
          }
          <div className="profile-user-details">
            <div className="profile-user-details-item">
              <span className="profile-user-details__quantity">{userData?.followingUsers.length}</span>
              <span className="profile-user-details__title">Following</span>
            </div>
            <div className="profile-user-details-item">
              <span className="profile-user-details__quantity">{userData?.followers.length}</span>
              <span className="profile-user-details__title">Folowers</span>
            </div>
          </div>
        </div>

        <Tabs
          variant="fullWidth"
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChangeTab}
        >
          <Tab label="Tweets" {...a11yProps(0)} />
          <Tab label="Tweets & replies" {...a11yProps(1)} />
          <Tab label="Media" {...a11yProps(2)} />
          <Tab label="Likes" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {
            isLoading ? (
              <CircularProgress />
            ) : (
              tweets
                .filter(tweet => !tweet.replyingTo)
                .map(tweet => (
                  <Tweet key={tweet._id} tweet={tweet} />
                ))
            )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {
            tweets
              .filter(tweet => tweet.replyingTo)
              .map(tweet => {
                if (tweet.replyingTo) return (
                  <React.Fragment key={tweet.replyingTo._id}>
                    <Tweet tweet={tweet.replyingTo} isReply={true} />
                    <Tweet key={tweet._id} tweet={tweet} />
                  </React.Fragment>
                );

                return undefined;
              })
          }
        </TabPanel>
        <TabPanel value={value} index={2}>
          {
            tweets
              .filter(tweet => tweet.images?.length)
              .map(tweet => (
                <Tweet key={tweet._id} tweet={tweet} />
              ))
          }
        </TabPanel>
        <TabPanel value={value} index={3}>
          {
            userFavoriteTweets?.map(tweet => (
              <Tweet key={tweet._id} tweet={tweet} />
            ))
          }
        </TabPanel>
      </div>
      {
        visibleSetUpModal && (
          <ModalWindow onClose={handleCloseSetUpModal}>
            <SetUpProfile userData={userData} onClose={handleCloseSetUpModal} />
          </ModalWindow>
        )
      }
    </div >
  );
};

export default Profile;
