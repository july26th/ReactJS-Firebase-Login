import React, { Component } from "react";
import firebase from "firebase";
import { firestore } from "../base";
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',
                name: '',
                phone: '',
                date: '',
                gender: 'male',
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
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((resp) => {
                return firestore.collection('users').doc(resp.user.uid).set({
                    email: user.email,
                    name: user.name,
                    gender: user.gender,
                    date: user.date,
                    phone: user.phone
                })
            })
            .then(() => {
                history.goBack();
            })
            .catch(function (error) {

            });
    }
    render() {
        const { user } = this.state;
        return (
            <div className="register">
                <h4>Đăng ký</h4>

                <form action="POST">
                    <div className="register-form mt-3">
                        <div className="form-group">
                            <p className="text-left">Email</p>
                            <input type="text" className="form-control" placeholder="Nhập vào Email..."
                                name="email" value={user.email} onChange={this.handleChange}
                                autoComplete="off" required />
                        </div>
                        <div className="form-group">
                            <p className="text-left">Mật khẩu</p>
                            <input type="password" className="form-control" placeholder="Nhập vào mật khẩu..."
                                name="password" value={user.password} onChange={this.handleChange}
                                autoComplete="new-password" required />
                        </div>
                        <div className="form-group">
                            <p className="text-left">Họ tên</p>
                            <input type="text" className="form-control" placeholder="Nhập vào tên..."
                                name="name" value={user.name} required onChange={this.handleChange} />
                        </div>
                        <div className="form-group text-left" >
                        <p className="text-left">Giới tính</p>
                            <span className="mr-3">
                                <input type="radio" name="gender" value="male"
                                    onChange={this.handleChange} checked={user.gender === "male"} />
                                Nam
                            </span>
                            <span>
                                <input type="radio" name="gender" value="female"
                                    onChange={this.handleChange} checked={user.gender === "female"} />
                                Nữ
                            </span>
                        </div>
                        <div className="form-group">
                            <p className="text-left">Ngày sinh</p>
                            <input type="date" className="form-control" placeholder="Nhập vào mật khẩu..."
                                name="date" value={user.date} required onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <p className="text-left">Số điện thoại</p>
                            <input type="number" className="form-control" placeholder="Nhập vào số điện thoại..."
                                name="phone" value={user.phone} required onChange={this.handleChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-danger w-100 my-4" onClick={this.onRegister}>
                        Đăng ký
                    </button>
                </form>
                <div className="text-left">Đã có tài khoản? <Link to="/">Đăng nhập</Link></div>
            </div>

        );
    }
}


export default Register;
