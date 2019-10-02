import React, { Component } from "react";
import firebase from "firebase";
import { Link } from 'react-router-dom';
// import  { firebaseApp, firestore } from "../base";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      },
    };

  }

  handleChange = event => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }
  onLogin = (e) => {
    document.getElementById('testform').onsubmit = function (e) {
      e.preventDefault();
    }
    const { email, password } = this.state.user;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      console.log(error);
    })
    return false;
  }

  render() {
    const { user } = this.state;
    return (
      <div className="login">
        <h4>Đăng nhập</h4>
        <p>với mạng xã hội của bạn</p>
        <div className="login-option mb-4 pb-2">
          <button className="btn mr-4 btn-google" onClick={() => this.props.authenticate("Google")}>
            <i className="fab fa-facebook-f mr-1"></i> Google
      </button>
          <button className="btn btn-facebook" onClick={() => this.props.authenticate("Facebook")}>
            <i className="fab fa-google-plus-g mr-1"></i> Facebook
      </button>
        </div>
        <div className="frame">
          <hr />
          <p>hoặc</p>
        </div>
        <form className="mt-4" action="POST" id="testform">
          <div className="login-form">

            <div className="form-group">
              <p className="text-left">Email</p>
              <input type="email" className="form-control" placeholder="Nhập vào Email..."
                name="email" value={user.email} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <p className="text-left">Mật khẩu</p>
              <input type="password" className="form-control" placeholder="Nhập vào mật khẩu..."
                name="password" value={user.password} onChange={this.handleChange} required
                autoComplete="new-password" />
            </div>
          </div>
          <div className="remember">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" value="checkedValue" />
              Ghi nhớ đăng nhập
      </div>
            <div><Link to="/">Quên mật khẩu?</Link></div>
          </div>
          <button type="submit" className="btn btn-danger w-100 my-4" onClick={this.onLogin}>Đăng nhập</button>
        </form>
        <div className="text-left">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></div>
      </div>

    );
  }
}


export default Login;
