import React from 'react';
import { Route } from 'react-router-dom';
import './index.scss';
import { BackButton } from '../../components/shared/BackButton/BackButton';
import Trend from '../../components/common/Trend/Trend';
import ThemeToggle from '../../components/shared/ThemeToggle/ThemeToggle';

const Trends: React.FC = () => (
  <div className="trends-wrapper">
    <div className="trends-header">
      <span className="trends-header__title"><BackButton />Trends</span>
      <ThemeToggle />
    </div>
    <Route path="/trends" exact>
      <Trend />
      <Trend />
      <Trend />
      <Trend />
      <Trend />
      <Trend />
      <Trend />
      <Trend />
    </Route>
  </div>
);

export default Trends;
