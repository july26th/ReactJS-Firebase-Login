import React, { Component } from "react";
import firebase from "firebase";
import Login from "./Login";
import UpdateInfo from "./UpdateInfo";
import { firebaseApp, firestore } from "../base";

class UserInfo extends Component {
  state = {
    userInfo: {
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }


  authHandler = async authData => {
    const snapshot = await firebase.firestore().collection('users').get()
    const data = snapshot.docs.find(doc => {
      return doc.data().email === authData.user.email
    }
    );
    const user = authData.user;
    if (data) {
      let info = data.data();
    
      localStorage.setItem('user', JSON.stringify(info));
      if (info.isUpdate === true) localStorage.setItem('isUpdate', JSON.stringify(true));
      
      else localStorage.setItem('isUpdate', JSON.stringify(false));
      
      this.setState({
        userInfo: { ...info }
      });
    }
    else {
      let email = user.email;
      let displayName = user.displayName;
      let registerBy = firebase.auth().currentUser.providerData[0].providerId;
      firestore.collection('users').doc(user.uid).set({
        email: email,
        name: displayName,
        registerBy: registerBy,
        uid: user.uid,
        isUpdate: false
      });
      localStorage.setItem('user', JSON.stringify(this.state.userInfo));
      localStorage.setItem('isUpdate', JSON.stringify(false));
      this.setState({
        userInfo: { email: email, name: displayName, uid: user.uid, isUpdate: false, registerBy: registerBy }
      })
    };
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    localStorage.setItem('isLogin', JSON.stringify(true));
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)

  };

  logout = async () => {
    await firebase.auth().signOut();
    localStorage.setItem('isLogin', JSON.stringify(false));
    this.setState({ userInfo: {} });
  };
  isUpdate = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  
  }
  onLogin = () => {
    localStorage.setItem('isLogin', JSON.stringify(true));
  }

  render() {
    var login = JSON.parse(localStorage.getItem('isLogin'));
    var update = JSON.parse(localStorage.getItem('isUpdate'));
    if (!login === true) {
      return <Login authenticate={this.authenticate} onLogin={this.onLogin} />;
    }
    else {
      var userInfo = JSON.parse(localStorage.getItem('user'));
      if (update === true) {
        console.log('zo day');
      
        return (
          <div className="info">
            <h4>Thông tin của bạn</h4>
            <div className="text-left pl-4 mt-4">
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
      else {
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
              <UpdateInfo userInfo={userInfo} isUpdate={this.isUpdate} />
            </div>
            <button type="button" onClick={this.logout} className="btn btn-warning w-50 mt-3">Đăng xuất</button>
          </div>
        );
      }
    }

  }
}

export default UserInfo;
