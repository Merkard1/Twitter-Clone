import React from 'react';
import './Trend.scss';

import { BsThreeDots } from 'react-icons/bs';

const Trend: React.FC = () => (
  <div className="trend">
    <div className="trend__wrapper">
      <span className="trend__header">Trending in Ukraine</span>
      <span className="trend__trend">Тренд 1</span>
      <span className="trend__quantity">3,5414 Tweets</span>
    </div>
    <BsThreeDots className="trend__dots" />
  </div>
);

export default Trend;
