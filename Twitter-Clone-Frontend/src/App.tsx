import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeSelectorProvider } from './contexts/ThemeSelectorProvider';
import { ProvideAuth } from './navigation/Auth/ProvideAuth';
import { RouterConfig } from './navigation/RouterConfig';
import { store } from './store/store';

export const App: React.FC = (): React.ReactElement => (
  <Provider store={store}>
    <ThemeSelectorProvider>
      <BrowserRouter>
        <ProvideAuth>
          <RouterConfig />
        </ProvideAuth>
      </BrowserRouter>
    </ThemeSelectorProvider>
  </Provider>

);

export default App;
