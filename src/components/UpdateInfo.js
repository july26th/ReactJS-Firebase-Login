import React, { Component } from "react";
import { firestore } from "../base";

class UpdateInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                phone: '',
                date: '',
                gender: 'male',
                submitted: false,
            }
        };

    };

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
    onUpdate = (update) => {
        const { email, name, registerBy, uid } = this.props.userInfo;
        const { user } = this.state;
        this.setState({
            submitted: true
        });
        if (user.phone && user.date) {
        firestore.collection('users').doc(uid).set({
            email: email,
            name: name,
            gender: user.gender,
            date: user.date,
            phone: user.phone,
            registerBy: registerBy,
            isUpdate: true
        })
            .then(
                () => { return this.props.isUpdate(update); }
            )
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (

            <div className="update-info my-3">
                <div className="text-center mb-3">
                    <button data-toggle="collapse" className="btn btn-outline-info" data-target="#demo">
                        Cập nhật thông tin</button>
                </div>
                <div id="demo" className="collapse">
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
                         {submitted && !user.date &&
                                    <div className="text-left validate">Vui lòng chọn ngày sinh</div>}
                    </div>
                    <div className="form-group">
                        <p className="text-left">Số điện thoại</p>
                        <input type="number" className="form-control" placeholder="Nhập vào số điện thoại..."
                            name="phone" value={user.phone} required onChange={this.handleChange} />
                                {submitted && !user.phone &&
                                    <div className="text-left validate">Vui lòng nhập số điện thoại</div>}
                        
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-success" onClick={() => this.onUpdate(true)}>Lưu</button>

                    </div>

                </div>
            </div>
        );
    }
}

export default UpdateInfo;
