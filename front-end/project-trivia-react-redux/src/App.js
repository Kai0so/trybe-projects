import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Config from './pages/Config';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import FeedbackPage from './pages/FeedbackPage';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/config" component={ Config } />
        <Route exact path="/game" component={ GamePage } />
        <Route exact path="/feedback" component={ FeedbackPage } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
