import React, { Component } from "react";
import firebase from "firebase";
import { Link } from 'react-router-dom';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      },
      check: true,
      submitted: false,
      notFound: true,
      sendError: false
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      },
      check: true,
      notFound: true
    });
  }
  onLogin = () => {
    const { email, password } = this.state.user;
    this.setState({
      submitted: true,
      sendError: false 
    })
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.props.onLogin();
    })
      .catch((e) => {
        if (e.code === "auth/wrong-password")
          this.setState({
            check: false
          })
        else
          this.setState({
            notFound: false
          })
        // console.log(e);
      })

  }
  reSend = () => {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
      console.log('send');
    }).catch((e) => {
      if (e.code === "auth/too-many-requests")
        this.setState({
          sendError: true
        });
    });

  }
  render() {
    const { user, submitted, check, notFound, sendError } = this.state;
    return (
      <div className="login">
        <h4>Đăng nhập</h4>
        <p>với mạng xã hội của bạn</p>
        <div className="login-option mb-4 pb-2">
          <button className="btn mr-4 btn-google" onClick={() => this.props.authenticate("Google")}>
            <i className="fab fa-google-plus-g mr-1"></i> Google
      </button>
          <button className="btn btn-facebook" onClick={() => this.props.authenticate("Facebook")}>
            <i className="fab fa-facebook-f mr-1"></i> Facebook
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
              {submitted && !user.email &&
                <div className="text-left validate">
                  Vui lòng nhập email
                </div>}
            </div>
            <div className="form-group">
              <p className="text-left">Mật khẩu</p>
              <input type="password" className="form-control" placeholder="Nhập vào mật khẩu..."
                name="password" value={user.password} onChange={this.handleChange} required
                autoComplete="new-password" />
              {submitted && !user.password &&
                <div className="text-left validate">
                  Vui lòng nhập mật khẩu
                </div>}
              {submitted && !check && user.email && user.password &&  
                <div className="text-left validate">
                  Tên tài khoản hoặc mật khẩu không chính xác
                </div>}
              {user.email && user.password && submitted && !notFound &&
                <div className="text-left validate">
                  Tài khoản không chính xác hoặc không tồn tại
                </div>}
                {submitted && sendError &&
                  <div className="text-left validate">Gửi E-mail xác nhận thất bại, vui lòng thử lại sau vài phút.</div>
                }
            </div>
          </div>
          <div className="remember">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" value="checkedValue" />
              Ghi nhớ đăng nhập
      </div>
            <div><Link to="/forgot-password">Quên mật khẩu?</Link></div>
          </div>
          <button type="button" className="btn btn-danger w-100 my-4" onClick={this.onLogin}>Đăng nhập</button>
        </form>
        <div className="text-left">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></div>
        <div className="modal fade" id="vertiBox" tabIndex={-1} role="dialog" data-backdrop="static" data-keyboard="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-body">
                <h5>Tài khoản chưa được xác thực, vui lòng kiểm tra lại E-mail để xác thực tài khoản.</h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={this.reSend} data-dismiss="modal">
                  Gửi lại E-mail xác thực
                  </button>
                <button type="button" className="btn btn-dark" data-dismiss="modal">
                  Đóng
                  </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="existed" tabIndex={-1} role="dialog" data-backdrop="static" data-keyboard="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-body">
                <h5>Tên E-mail này đã được đăng ký tài khoản, vui lòng hãy chọn tài khoản khác.</h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" data-dismiss="modal">
                  Đóng
                  </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}


export default Login;
