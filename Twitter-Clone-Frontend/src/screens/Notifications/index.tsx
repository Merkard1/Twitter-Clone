import React from 'react';
import './index.scss';
import { BackButton } from '../../components/shared/BackButton/BackButton';
import ThemeToggle from '../../components/shared/ThemeToggle/ThemeToggle';

const Notifications: React.FC = () => (
  <div className="notifications-wrapper">
    <div className="notifications-header">
      <span className="notifications-header__title"><BackButton />Notifications</span>
      <ThemeToggle />
    </div>
    <div className="message-empty">
      <div className="message-empty__title">The Notifications and More pages are not ready yet</div>
      <div className="message-empty__subtitle">We apologize for the inconvenience caused to you.</div>
    </div>
  </div>
);

export default Notifications;
