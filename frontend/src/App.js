import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Home from './components/Home';
import SellerHomePage from './components/SellerHomePage';
import CustomerHomePage from './components/CustomerHomePage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/home" component={Home} />
        <Route path="/seller-home" component={SellerHomePage} />
        <Route path="/customer-home" component={CustomerHomePage} />
      </Switch>
    </Router>
  );
};

export default App;
