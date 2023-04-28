import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import Toast from './components/toast/toast';
import Todos from './components/Todos/Todos';
import LoginDisplay from './components/login/login';
import classes from './app.module.scss';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [toastMessage, setToastMessage] = useState('');
  const [toastFirstRun, setToastFirstRun] = useState(true);

  const updateToastMessage = (msg: string) => {
    setToastFirstRun(false);
    setToastMessage(msg);
  };

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <span>Loading...</span>
        <div className="spinner-grow text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className={`container`}>
      {isAuthenticated ? (
        <>
          {toastFirstRun === false ? (
            <div className={classes.toastContainer}>
              <Toast
                message={toastMessage}
                resetMessage={() => updateToastMessage('')}
              />
            </div>
          ) : (
            <></>
          )}
          <Todos toastHandler={(msg: string) => updateToastMessage(msg)} />
        </>
      ) : (
        <LoginDisplay />
      )}
    </div>
  );
}

export default App;
