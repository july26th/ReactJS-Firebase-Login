import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from 'react-router-dom';
import UserInfo from "./components/UserInfo";
import Register from "./components/Register";
class App extends Component {
  render() {
    return (

      <div className="App">
        <Switch>
          <Route path="/" exact component={UserInfo} />
          <Route path="/register" match component={Register} />
          <Route path="/user-info" match component={UserInfo} />
        </Switch>
      </div>
    );
  }
}

export default App;
