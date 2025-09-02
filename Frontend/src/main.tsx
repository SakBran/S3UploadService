import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { store, persistor } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './context/AuthContext.tsx';
import { StepProvider } from './components/My Components/StepForm/StepContext.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <AuthProvider>
          <StepProvider>
            <App />
          </StepProvider>
        </AuthProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
