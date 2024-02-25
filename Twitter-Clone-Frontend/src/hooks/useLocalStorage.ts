import { useEffect, useState } from 'react';

const PREFIX = 'twitter-clone-';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useLocalStorage = <T>(key: string, defaultValue: T): any => {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
