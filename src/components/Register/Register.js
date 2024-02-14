import React, { Component } from "react";
import RegisterService from "./../../service/RegisterService";

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableList: [],
      fullname: "",
      province: "",
      email: "",
      password: "",
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  }
  handleChange = ({ target }) => {
    this.setState({
      selectedOption: target.value
    })
  }
  prov = [
    { id: '', name: '---กรุณาเลือกจังหวัด---' }
  ];
  componentDidMount() {
    RegisterService.getProvince().then((res) => {

      this.provs = res.data.concat(this.prov);
      console.log(this.provs);

      this.setState({ tableList: this.provs });
    });
  }

  // handle events 
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();

  onSubmit = ({ data }) => {
    alert(JSON.stringify(data));
  }
  // handle submit events
  // const onSubmit = data => alert(JSON.stringify(data));

  submitForm(e) {
    e.preventDefault();
    let body = {
      fullname: this.state.fullname,
      province: this.state.province,
      email: this.state.fullname,
      password: this.state.fullname
    };
    RegisterService.insertRegister(body).then((res) => {
      console.log("Data: ", res);
    });
    console.log("Data: ", e.target);
    // $.post("http://localhost/api_react/login.php", function (data) {
    //   if (data === "1") {
    //     localStorage.setItem("token", "loggedIn");
    //     console.log("success!");
    //   } else if (data === "0") {
    //     console.log("sorry!");
    //   }
    // });
  };

  render() {
    // const { email, password } = this.state;
    const isEnabled = this.state.fullname.length > 0 && this.state.province.length > 0 && this.state.email.length > 0 && this.state.password.length > 5;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <h2>สมัครสมาชิก</h2>
            <form onSubmit={this.submitForm}>
              <div className="form-group">
                <label /*for="fullname"*/>ชื่อ - นามสกุล</label>
                <input name="fullname" type="text" className="form-control" id="fullname" value={this.state.fullname}
                  onChange={this.onChange} required />
                <div className="invalid-feedback">
                  <span>กรุณากรอกชื่อ - นามสกุล</span>
                </div>
              </div>
              <div className="form-group">
                <label /*for="province"*/>จังหวัด</label>
                <select name="province" className="form-control" id="province" value={this.state.province} onChange={this.onChange} required>
                  {/* {this.state.province.map(({ id, name }, index) => <option value={id} >{name}</option>)} */}
                  {this.state.tableList.map((item) =>
                    <option key={item.id} value={item.id} >{item.name}</option>
                  )
                  }
                </select>
                {/* <select
                  className={`w-96 rounded-lg text-3xl ${errors.gender &&
                    " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                  {...register("gender", { required: 'Gender is required' })}
                >
                  <option value=''>--Select Gender--</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>other</option>
                </select> */}
                <div className="invalid-feedback">
                  <span>กรุณาเลือกจังหวัด</span>
                </div>
              </div>
              <div className="form-group">
                <label /*for="email"*/>Email address</label>
                <input name="email" type="email" className="form-control" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="name@example.com" value={this.state.email}
                  onChange={this.onChange} required />
                <div className="invalid-feedback">
                  <span>กรุณากรอก email</span>
                  <span>รูปแบบ email ไม่ถูกต้อง</span>
                </div>
              </div>
              <div className="form-group">
                <label /*for="password"*/>Password</label>
                <input name="password" type="password" className="form-control" id="password" placeholder="อย่างน้อย 5 อักษร" value={this.state.password}
                  onChange={this.onChange} required />
                <div className="invalid-feedback">
                  <span>กรุณากรอกรหัส</span>
                  <span>กรุณากรอกอย่างน้อย 5 ตัว</span>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={!isEnabled}>สมัครสมาชิก</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
