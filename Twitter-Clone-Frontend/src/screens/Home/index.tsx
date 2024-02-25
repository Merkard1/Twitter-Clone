import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchDataOfSpecificTweets } from '../../store/ducks/tweets/actionCreators';
import { selectItemsOfTweets, selectStatusOfTweetsIsLoading } from '../../store/ducks/tweets/selectors';
import './index.scss';
import { BackButton } from '../../components/shared/BackButton/BackButton';
import AddTweetForm from '../../components/common/AddTweetForm/AddTweetForm';
import Tweet from '../../components/common/Tweet/Tweet';
import FullTweet from '../../components/common/FullTweet/FullTweet';
import ThemeToggle from '../../components/shared/ThemeToggle/ThemeToggle';
import CircularProgress from '../../components/shared/CircularProgress/CircularProgress';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const tweets = useSelector(selectItemsOfTweets);
  const isLoading = useSelector(selectStatusOfTweetsIsLoading);

  React.useEffect(() => {
    dispatch(fetchDataOfSpecificTweets('following'));
  }, []);

  return (
    <div className="home-wrapper">
      <div className="home-header">
        <Route path="/home" exact>
          <span className="home-header__title">Home</span>
        </Route>
        <Route path="/home/:any">
          <span className="home-header__title"><BackButton />Tweet</span>
        </Route>
        <ThemeToggle />
      </div>
      <Route path="/home" exact>
        <AddTweetForm defaultDraftRowsValue={1} />
        <div className="home-divider" />
        {isLoading ? (
          <CircularProgress />
        ) : (
          tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))
        )}
      </Route>
      <Route path="/home/tweet/:id" exact>
        <FullTweet></FullTweet>
      </Route>
    </div>
  );
};

export default Home;
