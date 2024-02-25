import React, { useRef } from 'react';

import './SearchBox.scss';
import { FiSearch } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../../store/ducks/search/actionCreators';
import { selectUsersOfSearch } from '../../../store/ducks/search/selectors';
import ConnectPerson from '../ConnectPerson/ConnectPerson';

const SearchBox: React.FC = () => {
  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const ref = useRef<HTMLDivElement>(null);
  const searchBox = React.useRef<HTMLInputElement>(null);
  const searchedUsers = useSelector(selectUsersOfSearch);

  React.useEffect(() => {
    const timer = setTimeout(
      () => {
        if (text.length < 56 && text.length > 0) {
          dispatch(searchUsers({ criteria: text }));
        }
      }, 300);
    return () => clearTimeout(timer);
  }, [text]);

  const onBlurInput = (event: MouseEvent): void => {
    if (ref.current != null) {
      const { current } = ref;
      if (!current.contains(event.target as Node)) {
        document.removeEventListener('click', onBlurInput);
        setVisibleModal(false);
        setText('');
      }
    }
  };

  const onFocusInput = (): void => {
    setVisibleModal(true);
    if (!visibleModal) {
      document.addEventListener('click', onBlurInput);
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.currentTarget) {
      setText(event.currentTarget.value);
    }
  };

  const handleClickCleanInput = (): void => {
    setText('');
  };

  return (
    <div className="search-box" onClick={() => searchBox.current?.focus()} ref={ref}>
      <FiSearch className="search-box__icon" />
      <input
        ref={searchBox}
        onFocus={onFocusInput}
        onChange={handleChangeInput}
        value={text}
        type="text"
        className="search-box__input"
        placeholder="Search Twitter" />
      <MdCancel onClick={handleClickCleanInput} className="search-box__cancel" />
      {visibleModal && (
        <div className="search-box-modal">
          {searchedUsers.length > 0 ? (
            searchedUsers.map((item, index) => (
              <ConnectPerson key={index} user={item} isWhoToFollowBlock={true} />
            ))
          ) : (
            <p className="search-box-modal__text">
              Try searching for people, topics, or keywords
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
