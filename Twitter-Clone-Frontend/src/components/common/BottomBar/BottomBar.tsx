import React from 'react';
import { BiHomeCircle } from 'react-icons/bi';
import { MdMailOutline } from 'react-icons/md';
import { RiFileList2Line, RiUser6Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectDataOfUser } from '../../../store/ducks/user/selectors';
import './BottomBar.scss';

const BottomBar: React.FC = () => {
  const userData = useSelector(selectDataOfUser);

  return (
    <div className="bottom-bar-list">
      <Link to="/home" className="bottom-bar-list__link">
        <div className="bottom-bar-item">
          <BiHomeCircle className="bottom-bar-item__icon" />
        </div>
      </ Link>
      <Link to="/connect_people" className="bottom-bar-list__link list">
        <div className="bottom-bar-item">
          <RiFileList2Line className="bottom-bar-item__icon" />

        </div>
      </ Link >
      <Link to="/messages" className="bottom-bar-list__link">
        <div className="bottom-bar-item">
          <MdMailOutline className="bottom-bar-item__icon" />
        </div>
      </ Link >
      <Link to={`/user/${userData?._id}`} className="bottom-bar-list__link">
        <div className="bottom-bar-item">
          <RiUser6Line className="bottom-bar-item__icon" />
        </div>
      </ Link >
    </div >
  );
};

export default BottomBar;
