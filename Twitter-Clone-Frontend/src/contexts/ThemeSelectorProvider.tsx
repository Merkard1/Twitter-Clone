import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface IThemeProviderProps {
  children?: React.ReactNode
}

interface IUseProvideThemeSelector {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeSelectorContext = React.createContext<IUseProvideThemeSelector>({} as IUseProvideThemeSelector);

export const ThemeSelectorProvider: React.FC<IThemeProviderProps> = ({ children }: IThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [themeName, setThemeName] = React.useState<'light' | 'dark'>(theme);
  document.documentElement.setAttribute('data-theme', themeName);

  const toggleTheme = () => {
    if (themeName === 'dark') {
      setThemeName('light');
      setTheme('light');
    } else {
      setThemeName('dark');
      setTheme('dark');
    }
    document.documentElement.setAttribute('data-theme', themeName);
  };

  return (
    <ThemeSelectorContext.Provider value={{ themeName, toggleTheme }}>
      { children}
    </ThemeSelectorContext.Provider>
  );
};

export function UseThemeSelector(): IUseProvideThemeSelector {
  return React.useContext(ThemeSelectorContext);
}
