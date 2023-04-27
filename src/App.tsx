import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Todos from './features/todos/Todos';
import LoginDisplay from './components/login/login';
import classes from './app.module.scss';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

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
      {isAuthenticated ? <Todos /> : <LoginDisplay />}
    </div>
  );
}

export default App;
