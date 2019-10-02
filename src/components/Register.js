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
            submitted: false,
            checkLength: false,
        };
        this.refPassword = React.createRef();
    }
    componentDidMount() {
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
    onRegister = () => {
        document.getElementById('registerForm').onsubmit = function (e) {
            e.preventDefault();
        }
        const { user } = this.state;
        const { history } = this.props;
        this.setState({ submitted: true });
        if (this.refPassword.current.value.length >= 6) {
            this.setState({ checkLength: true });
       
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((resp) => {
                    return firestore.collection('users').doc(resp.user.uid).set({
                        email: user.email,
                        name: user.name,
                        gender: user.gender,
                        date: user.date,
                        phone: user.phone,
                        registerBy: "normal",
                        isUpdate: true
                    })
                })
                .then(() => {
                    history.goBack();
                })
                .catch(function (error) {

                });
        }
        else {
        }
    }
    render() {
        const { user, submitted, checkLength } = this.state;
        return (
            <div className="register">
                <h4>Đăng ký</h4>

                <form action="POST" id="registerForm">
                    <div className="register-form mt-3">
                        <div className="form-group">
                            <p className="text-left">Email</p>

                            <div className="register-input">
                                <i class="far fa-envelope"></i>
                                <input type="text" className="form-control" placeholder="Nhập vào Email..."
                                    name="email" value={user.email} onChange={this.handleChange}
                                    autoComplete="off" required />
                            </div>
                            {submitted && !user.email &&
                                <div className="text-left validate">Vui lòng nhập Email</div>}
                        </div>
                        <div className="form-group">
                            <p className="text-left">Mật khẩu</p>
                            <div className="register-input">
                                <i class="fas fa-key"></i>
                                <input type="password" className="form-control" placeholder="Nhập vào mật khẩu..."
                                    name="password" value={user.password} onChange={this.handleChange}
                                    autoComplete="new-password" required ref={this.refPassword} />
                            </div>
                            {submitted && !user.password &&
                                <div className="text-left validate">Vui lòng nhập mật khẩu</div>}
                             {submitted && user.password && !checkLength &&
                                <div className="text-left validate">Mật khẩu phải có ít nhất 6 ký tự</div>}
                                    
                        </div>
                        <div className="form-group">
                            <p className="text-left">Họ tên</p>
                            <div className="register-input">
                                <i class="fas fa-user"></i>
                                <input type="text" className="form-control" placeholder="Nhập vào tên..."
                                    name="name" value={user.name} required onChange={this.handleChange} />
                            </div>
                            {submitted && !user.name &&
                                <div className="text-left validate">Vui lòng nhập họ tên</div>}
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
                            <div className="register-input">
                                <i class="fas fa-birthday-cake"></i>
                                <input type="date" className="form-control" placeholder="Nhập vào mật khẩu..."
                                    name="date" value={user.date} required onChange={this.handleChange}
                                />
                            </div>
                            {submitted && !user.date &&
                                <div className="text-left validate">Vui lòng chọn ngày sinh</div>}
                        </div>
                        <div className="form-group">
                            <p className="text-left">Số điện thoại</p>
                            <div className="register-input">
                                <i class="fas fa-mobile-alt"></i>
                                <input type="number" className="form-control" placeholder="Nhập vào số điện thoại..."
                                    name="phone" value={user.phone} required onChange={this.handleChange} />
                            </div>
                            {submitted && !user.phone &&
                                <div className="text-left validate">Vui lòng nhập số điện thoại</div>}
                        </div>
                    </div>
                    <button type="button" className="btn btn-danger w-100 my-4" onClick={this.onRegister}>
                        Đăng ký
                    </button>
                </form>
                <div className="text-left">Đã có tài khoản? <Link to="/">Đăng nhập</Link></div>
            </div>

        );
    }
}


export default Register;
