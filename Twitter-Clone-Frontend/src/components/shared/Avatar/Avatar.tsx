import React from 'react';
import { generateHexColor } from '../../../utils/generateHexColor';
import './Avatar.scss';

type TAvatarSizes = 'retweet' | 'small' | 'middle' | 'large';

interface IAvatarProps {
  size: TAvatarSizes;
  id?: string;
  fullName?: string;
  avatar?: string;
  response: boolean;
}

const getInitials = (fullName?: string): string => {
  if (fullName) {
    return fullName
      .trim()
      .split(' ')
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  return '';
};

const Avatar: React.FC<IAvatarProps> = ({
  size,
  id,
  fullName,
  avatar,
  response,
}: IAvatarProps) => {
  let options;

  switch (size) {
    case 'large':
      options = {
        width: '142px',
        height: '142px',
        border: '4px solid var(--avatarBorder)',
        fontSize: '64px',
      };
      break;
    case 'small':
      options = {
        width: '40px',
        height: '40px',
        fontSize: '15px',
      };
      break;
    case 'retweet':
      options = {
        width: '20px',
        height: '20px',
        fontSize: '8px',
      };
      break;
    default:
      options = {
        width: '48px',
        height: '48px',
        fontSize: '20px',
      };
      break;
  }

  if (avatar) {
    return (
      <>
        { response ? (
          <a className="avatar" style={options} href={`/user/${id}`}>
            <div className="avatar__wrapper" style={{ backgroundColor: '#c4cfd6' }}>
              <img className={response ? "response" : ""} src={avatar} alt="Avatar" />
            </div>
          </a>
        ) : (
            <div className="avatar" style={options}>
              <div className="avatar__wrapper" style={{ backgroundColor: '#c4cfd6' }}>
                <img className={response ? "response" : ""} src={avatar} alt="Avatar" />
              </div>
            </div>
          )}
      </>
    );
  }

  return (
    <>
      { response ? (
        <a className="avatar" style={options} href={`/user/${id}`}>
          <div
            className="avatar__wrapper" style={{ backgroundColor: generateHexColor(fullName) }}>
            <div className={response ? "avatar__background response" : "avatar__background"}>
              <div className="avatar__text">{getInitials(fullName)}</div>
            </div>
          </div>
        </a>
      ) : (
          <div className="avatar" style={options}>
            <div
              className="avatar__wrapper" style={{ backgroundColor: generateHexColor(fullName) }}>
              <div className={response ? "avatar__background response" : "avatar__background"}>
                <div className="avatar__text">{getInitials(fullName)}</div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Avatar;
