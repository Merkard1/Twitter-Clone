import React from 'react';
import './index.scss';
import AppTapBar from '../../common/AppTapBar/AppTapBar';
import AccountMenu from '../../common/AccountMenu/AccountMenu';
import SearchBox from '../../common/SearchBox/SearchBox';
import TrendsForYou from '../../common/TrendsForYou/TrendsForYou';
import WhoToFollow from '../../common/WhoToFollow/WhoToFollow';
import ServiceUsage from '../../common/ServiceUsage/ServiceUsage';
import BottomBar from '../../common/BottomBar/BottomBar';

interface IDefaultLayout {
  children: React.ReactNode,
  IsVisibleSearchBox?: boolean,
  IsVisibleTrendsForYou?: boolean,
  IsVisibleWhoToFollow?: boolean,
  IsVisibleServiceUsage?: boolean,
  IsVisibleChats?: boolean,
}

export const DefaultLayout: React.FC<IDefaultLayout> = ({
  children,
  IsVisibleSearchBox = false,
  IsVisibleTrendsForYou = false,
  IsVisibleWhoToFollow = false,
  IsVisibleServiceUsage = true,
  IsVisibleChats = false,
}: IDefaultLayout) => (
  <div className="wrapper">
    <header className="left-side">
      <div className="sidebar">
        <div className="sidebar-bar">
          <AppTapBar />
        </div>
        <AccountMenu />
      </div>
    </header>
    <main className="main-side">
      <div className="content-container">
        {IsVisibleChats ? (
          <>
            {children}
          </>
        ) : (
          <>
            <div className="primary-column">
              {children}
            </div>
            <div className="sidebar-column">
              {IsVisibleSearchBox && <SearchBox />}
              {IsVisibleTrendsForYou && <TrendsForYou />}
              {IsVisibleWhoToFollow && <WhoToFollow />}
              {IsVisibleServiceUsage && <ServiceUsage isFullContent={false} />}
            </div>
          </>
        )}
      </div>
    </main >
    <nav className="bottom-bar-wrapper">
      <BottomBar />
    </nav>
  </div>
);
