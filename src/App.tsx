import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RegistrationView from './views/Registration/RegistrationView';
import CellarView from './views/Cellar/CellarView';
import BottleView from './views/Bottle/BottleView';
import 'font-awesome/css/font-awesome.min.css';

const App: React.FC = () => {
  return (
    <div className="h-100">
      <Router>
        <Switch>
          <Route path="/" exact>
            <h2>Home</h2>
          </Route>
          <Route path="/register" exact>
            <RegistrationView />
          </Route>
          <Route path="/cellar">
            <CellarView />
          </Route>
          <Route path="/bottle">
            <BottleView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
