import React, { Component } from "react";
import firebase from "firebase";
import { firestore } from "../base";
// import UserInfo from "./UserInfo";
import { Link, Redirect } from 'react-router-dom';

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
            existedUser: false,
        };
        this.refPassword = React.createRef();
        this.refFocus = React.createRef();
    }

    componentDidMount() {
        this.refFocus.current.focus();
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
        if (this.refPassword.current.value.length >= 6)
            this.setState({
                checkLength: true
            })

        else this.setState({
            checkLength: false
        })

    }
    onRegister = () => {
        const { user } = this.state;
        this.setState({ submitted: true });
        if (this.refPassword.current.value.length >= 6) {
            if (user.email && user.name && user.phone && user.date) {
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
                        let user = firebase.auth().currentUser;
                        user.sendEmailVerification().then(function () {
                            const $ = window.$;
                            $('#modelId').modal('show');
                            console.log('send');
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                    )
                    .catch((error) => {
                        console.log(error);
                        if (error.code === "auth/email-already-in-use")
                            this.setState({
                                existedUser: true
                            });
                    });

            }
        }
        else {
            this.setState({ checkLength: false });
        }
    }

    close = () => {
        const $ = window.$;
        $('#modelId').modal('hide');
    }
    continue = () => {
        const $ = window.$;
        $('#modelId').modal('hide');
        this.setState({
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
        })
    }
    render() {
        const { user, submitted, checkLength, existedUser } = this.state;
        console.log(checkLength);
        var login = JSON.parse(localStorage.getItem('isLogin'));
        if (login === true) return <Redirect to="/" />
        else
            return (
                <div className="register">
                    <h4>Đăng ký</h4>

                    <form action="POST" id="registerForm">
                        <div className="register-form mt-3">
                            <div className="form-group">
                                <p className="text-left">Email</p>

                                <div className="register-input">
                                    <i className="far fa-envelope"></i>
                                    <input type="text" className="form-control" placeholder="Nhập vào Email..."
                                        name="email" value={user.email} onChange={this.handleChange}
                                        autoComplete="off" required  ref={this.refFocus} />
                                </div>
                                {submitted && !user.email &&
                                    <div className="text-left validate">Vui lòng nhập Email</div>}
                                {submitted && existedUser &&
                                    <div className="text-left validate">Email này đã có người sử dụng</div>}
                            </div>
                            <div className="form-group">
                                <p className="text-left">Mật khẩu</p>
                                <div className="register-input">
                                    <i className="fas fa-key"></i>
                                    <input type="password" className="form-control" placeholder="Nhập vào mật khẩu..."
                                        name="password" value={user.password} onChange={this.handleChange}
                                        autoComplete="new-password" required
                                        ref={this.refPassword}
                                    />
                                </div>
                                {submitted && !user.password &&
                                    <div className="text-left validate">Vui lòng nhập mật khẩu</div>}
                                {submitted && user.password && !checkLength &&
                                    <div className="text-left validate">Mật khẩu phải có ít nhất 6 ký tự</div>}

                            </div>
                            <div className="form-group">
                                <p className="text-left">Họ tên</p>
                                <div className="register-input">
                                    <i className="fas fa-user"></i>
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
                                    <i className="fas fa-birthday-cake"></i>
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
                                    <i className="fas fa-mobile-alt"></i>
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
                    <div>
                        <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" data-backdrop="static" data-keyboard="false">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">

                                    <div className="modal-body">
                                        <h5>Đăng ký thành công, vui lòng kiểm tra E-mail để xác nhận tài khoản</h5>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success"><Link to="/" onClick={this.close} >Trở lại trang chủ</Link></button>
                                        <button type="button" className="btn btn-dark" onClick={this.continue}>
                                            <Link to="/register">Tiếp tục đăng ký</Link></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
    }
}


export default Register;
