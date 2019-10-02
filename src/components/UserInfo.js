import React, { Component } from "react";
import firebase from "firebase";
import Login from "./Login";
import UpdateInfo from "./UpdateInfo";
import { firebaseApp, firestore } from "../base";
import { history } from "../history";

class UserInfo extends Component {
  state = {
    userInfo: {
    },
    isLogin: false
  };

  async componentDidMount() {
    // const snapshot = await firebase.firestore().collection('users').get()
    // const dataList = snapshot.docs.map(doc => {
    //   return doc.data();
    // });
    // this.setState({
    //   dataList: dataList
    // });
    // if(this.state.isUpdate === true) {
    //   this.setState
    // }
    // console.log(firebase.auth());
  
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('hi');
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
    // console.log(data.data());
    if (data) { 
      console.log('vo tren')
      let info = data.data(); 
      this.setState({
        userInfo: { ...info }
      })  
    }
    else {
      console.log('vo duoi')
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
      this.setState({
        userInfo: { email: email, name: displayName, uid: user.uid, isUpdate: false, registerBy: registerBy }
      })
    }
    this.setState({
      isLogin: true
    })
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
     
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ userInfo: {}, isLogin: false });
  };
  isUpdate = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }
  render() {
    const { userInfo, isLogin } = this.state;
    console.log(isLogin)
    if (!isLogin) {
      return <Login authenticate={this.authenticate} />;
    }

    if (userInfo.isUpdate === true) {
      console.log('update r')
      // console.log(userInfo);
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
      console.log('chua update');
      // console.log(userInfo);
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

export default UserInfo;
