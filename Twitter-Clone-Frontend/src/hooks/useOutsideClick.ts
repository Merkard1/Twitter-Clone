/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOutsideClick = (ref: any, callback: any): void => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
