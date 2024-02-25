import React from 'react';
import { UseThemeSelector } from '../../../contexts/ThemeSelectorProvider';
import './ThemeToggle.scss';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, themeName } = UseThemeSelector();

  return (
    <div className="themeToggle">
      <input
        onChange={toggleTheme}
        checked={themeName === 'light'}
        type="checkbox"
        id="hide-checkbox" />
      <label htmlFor="hide-checkbox" className="themeToggle-wrapper">
        <span className="themeToggle__button">
          <span className="crater crater-1"></span>
          <span className="crater crater-2"></span>
          <span className="crater crater-3"></span>
          <span className="crater crater-4"></span>
          <span className="crater crater-5"></span>
          <span className="crater crater-6"></span>
          <span className="crater crater-7"></span>
        </span>
        <span className="star star-1"></span>
        <span className="star star-2"></span>
        <span className="star star-3"></span>
        <span className="star star-4"></span>
        <span className="star star-5"></span>
        <span className="star star-6"></span>
        <span className="star star-7"></span>
        <span className="star star-8"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
