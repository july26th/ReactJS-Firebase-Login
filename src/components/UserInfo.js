import React, { Component } from "react";
import firebase from "firebase";
import Login from "./Login";
import { firebaseApp } from "../base";

class UserInfo extends Component {
  state = {
    email: null,
    displayName: null,
    userInfo: {}
  };

  componentDidMount() {
    this.getMarker();
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.authHandler({ user });
      }
    });

  }
  async getMarker() {

  }
  authHandler = async authData => {
    const snapshot = await firebase.firestore().collection('users').get()
    const data = snapshot.docs.find(doc => {
      return doc.data().email === authData.user.email
    }
    );
    const info = data.data();
    const user = authData.user;

    this.setState({
      email: user.email,
      displayName: user.displayName,
      userInfo: info
    });
  };

  authenticate = provider => {
    // console.log(provider);
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    // console.log("logout");
    await firebase.auth().signOut();
    this.setState({ email: null, displayName: null });
  };

  render() {
    const { userInfo } = this.state;
    if (!this.state.email) {
      return <Login authenticate={this.authenticate} />;
    }
    return (
      <div className="info">
        <h4>Thông tin của bạn</h4>
        <div className="text-left px-4 mt-4">
          <div className="user-info">
            <label>Họ tên:</label>
            <span type="text" id="email">
              {userInfo.name}
            </span>
          </div>
          <div className="user-info">
            <label>Email:</label>
            <span type="text" id="email">
              {userInfo.email}
            </span>
          </div>
          <div className="user-info">
            <label>Giới tính:</label>
            <span type="text" id="email">
              {userInfo.gender === "male" ? "Nam" : "Nữ"}
            </span>
          </div>
          <div className="user-info">
            <label>Ngày sinh:</label>
            <span type="text" id="email">
              {userInfo.date}
            </span>
          </div>
          <div className="user-info">
            <label>Số điện thoại:</label>
            <span type="text" id="email">
              {userInfo.phone}
            </span>
          </div>
        </div>
        <button type="button" onClick={this.logout} className="btn btn-warning w-50 mt-3">Đăng xuất</button>
      </div>
    );
  }
}

export default UserInfo;
