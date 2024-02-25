/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
export const generateHexColor = (str?: string): string => {
  let hash = 0;
  let i = 0;

  if (!str || str.length === 0) return '#c4cfd6';
  for (i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash &= hash;
  }
  let color = '#';
  for (i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    color += (`00${value.toString(16)}`).substr(-2);
  }
  return color;
};
