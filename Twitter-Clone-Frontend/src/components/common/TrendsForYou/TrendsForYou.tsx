import React from 'react';
import { Link } from 'react-router-dom';

import './TrendsForYou.scss';
import { FiSettings } from 'react-icons/fi';
import ShowMoreButton from '../../shared/ShowMoreButton/ShowMoreButton';
import Trend from '../Trend/Trend';


const TrendsForYou: React.FC = () => (
  <div className="trends-block">
    <div className="trends-block-header">
      <span className="trends-block-header__text">Trends for you</span>
      <div className="trends-block-settings">
        <FiSettings className="trends-block-settings__icon" />
      </div>
    </div>
    <div className="trends-block-list">
      <Trend />
      <Trend />
      <Link to="/trends" className="trends-block__link">
        <ShowMoreButton />
      </ Link>
    </div>
  </div>
);

export default TrendsForYou;
