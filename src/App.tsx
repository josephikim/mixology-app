import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DemoView from './views/Demo/DemoView';
import CellarView from './views/Cellar/CellarView';
import BottleView from './views/Bottle/BottleView';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  return (
    <div className="h-100">
      <Router>
        <Switch>
          <Route path="/" exact>
            <DemoView />
          </Route>
          <Route path="/cellar">
            <CellarView />
          </Route>
          <Route path="/bottletest">
            <BottleView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
