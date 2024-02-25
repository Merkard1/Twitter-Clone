import React from 'react';
import { CircularProgress as Circle } from '@material-ui/core';
import './CircularProgress.scss';

const CircularProgress: React.FC = () => (
  <div className="circularProgress-wrapper">
    <Circle className="circularProgress" />
  </div>
);

export default CircularProgress;
