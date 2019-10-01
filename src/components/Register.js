import React, { Component } from "react";
import firebase from "firebase";
import  { firestore } from "../base";
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',
                name: '',
                phone: ''
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
    onRegister = (e) => {
        const { user } = this.state;
        const { history } = this.props;
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
        .then(function(result) {
            return result.user.updateProfile({
              displayName: user.name
            })
          })
        .then((resp) => {
          return firestore.collection('users').doc(resp.user.uid).set({
            email: user.email,
            name: user.name,
            phone: user.phone
          })
        })
        .then(() => {
            history.goBack();
         })
        .catch(function(error) {
     
          });
      }
    render() {
        const { user } = this.state;
        return (
            <div className="register">
                <h4>Đăng ký</h4>
                <div className="register-form mt-3">
                    <div className="form-group">
                        <p className="text-left">Email</p>
                        <input type="text" className="form-control" placeholder="Nhập vào Email..."
                         name="email" value={user.email} onChange={this.handleChange}
                         autoComplete="off" />
                    </div>
                    <div className="form-group">
                        <p className="text-left">Mật khẩu</p>
                        <input type="password" className="form-control" placeholder="Nhập vào mật khẩu..." 
                         name="password" value={user.password} onChange={this.handleChange}
                         autoComplete="new-password"/>
                    </div>
                    <div className="form-group">
                        <p className="text-left">Tên hiển thị</p>
                        <input type="text" className="form-control" placeholder="Nhập vào tên..."
                         name="name" value={user.name} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <p className="text-left">Số điện thoại</p>
                        <input type="text" className="form-control" placeholder="Nhập vào số điện thoại..."
                         name="phone" value={user.phone} onChange={this.handleChange} />
                    </div>
                </div>
                <button type="button" className="btn btn-danger w-100 my-4" onClick={this.onRegister}>
                    Đăng ký
                    </button>   
                    <div className="text-left">Đã có tài khoản? <Link to="/">Đăng nhập</Link></div>
            </div>
        );
    }
}


export default Register;
