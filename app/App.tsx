import React, { type FC} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux';
import { AppContainer } from './navigation';

/**
 * The main App component.
 * We're using the Provider component from react-redux to wrap our AppContainer component, which is the
 * component that contains all of our routes
 * @returns The App component is being returned
 */
const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
