import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from 'react-router-dom';
import UserInfo from "./components/UserInfo";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgetPassword";
class App extends Component {
  render() {
    return (

      <div className="App">
        <Switch>
          <Route path="/" exact match component={UserInfo} />
          <Route path="/register" match component={Register} />
          <Route path="/forgot-password" match component={ForgotPassword} />
        </Switch>
      </div>
    );
  }
}

export default App;
