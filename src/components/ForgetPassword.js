import React, { Component } from "react";
import firebase from "firebase";
import { Link } from 'react-router-dom';
class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            send: false,
            wrongEmail: false,
            notFound: false
        };

    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    sendRequest = () => {
        let auth = firebase.auth();
        this.setState({
            send: true,
            wrongEmail: false,
            notFound: false
        });
        auth.sendPasswordResetEmail(this.state.email).then(function () {
            console.log('hi');
        }).catch((e) => {
            if (e.code === "auth/invalid-email") {
                this.setState({
                    wrongEmail: true
                });
            }
            else if (e.code === "auth/user-not-found") {
                this.setState({
                    notFound: true
                });
            }
        });
    }

    render() {
        const { email, send, wrongEmail, notFound } = this.state;
        console.log(send + "va" + notFound + "va" + wrongEmail + "va" + email)
        return (

            <div className="info my-3">
                <div className="text-center mb-3">
                    <h5>Quên Mật Khẩu?</h5>
                </div>
                <div className="form-group">
                    <p className="text-left">Nhập vào địa chỉ E-mail của bạn, chúng tôi sẽ gửi yêu cầu đặt lại mật khẩu tới bạn...</p>
                    <input type="email" className="form-control" placeholder="Nhập vào Email..."
                        name="email" value={email} onChange={this.handleChange} required />
                    {notFound && send &&
                        <div className="text-left validate">
                            Không tìm thấy tài khoản E-mail trong hệ thống
                        </div>}
                    {wrongEmail && send &&
                        <div className="text-left validate">
                            Vui lòng nhập E-mail đúng định dạng
                        </div>}
                    {send && !notFound && !wrongEmail &&
                        <div className="text-left validate">
                            Gửi thành công! Vui lòng kiểm tra E-mail của bạn!
                </div>}
                </div>
                <button type="button" className="btn btn-danger w-100 my-4" onClick={this.sendRequest}>Gửi</button>
                <div><Link to="/">Quay lại Đăng nhập</Link></div>

            </div>
        );
    }
}

export default ForgetPassword;
