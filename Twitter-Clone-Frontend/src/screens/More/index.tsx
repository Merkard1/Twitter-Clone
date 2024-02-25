import React from 'react';
import './index.scss';
import { BackButton } from '../../components/shared/BackButton/BackButton';
import ThemeToggle from '../../components/shared/ThemeToggle/ThemeToggle';

const More: React.FC = () => (
  <div className="more-wrapper">
    <div className="more-header">
      <span className="more-header__title"><BackButton />More</span>
      <ThemeToggle />
    </div>
    <div className="message-empty">
      <div className="message-empty__title">The Notifications and More pages are not ready yet</div>
      <div className="message-empty__subtitle">We apologize for the inconvenience caused to you.</div>
    </div>
  </div>
);

export default More;
