import React, { Component } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   NavLink,
// } from "react-router-dom";
import Swal from 'sweetalert2';
import ApiService from "./../../service/ApiService";
// import moment from 'moment';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      appName: "ReactJS Feed Example",
      home: false,
      userid: '',
      fullname: '',
      workdate: '',
      workin: '',
      workout: '',
      status: '',
      rowio: {},
      isEnabled: ''
    };
    // console.log(this.state);
    const today = new Date();
    this.state.workdate = this.formatDateWithLocale(today, { format: "YYYY-MM-DD" });
    this.state.workin = today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0') + ":" + today.getSeconds().toString().padStart(2, '0');
    this.state.workout = today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0') + ":" + today.getSeconds().toString().padStart(2, '0');
    // this.state.workin = moment(today).format('h:mm:ss');
    // this.state.workout = moment(today).format('h:mm:ss');
    // const hours = today.getHours().toString().padStart(2, '0');
    // const minutes = today.getMinutes().toString().padStart(2, '0');
    // const formattedTime = `${hours}:${minutes}`;

    // this.state.workin = today.getHours() + ':' + today.getMinutes() + ":" + today.getSeconds();
    // this.state.workout = today.getHours() + ':' + today.getMinutes() + ":" + today.getSeconds();

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);

    // const formattedDate0 = this.formatDateWithLocale(today);
    // const formattedDate1 = this.formatDateWithLocale(today, { humanize: true });
    // const formattedDate2 = this.formatDateWithLocale(today, { format: "MM:DD:YYYY", });
    // const formattedDate3 = this.formatDateWithLocale(today, { format: "YYYY-MM-DD" });
    // console.log(formattedDate0); //--> 05/07/2023
    // console.log(formattedDate1); //--> Today
    // console.log(formattedDate2); //--> 07:05:2023
    // console.log(formattedDate3); //--> 2023-07-05
  }

  formatDateWithLocale(timestamp, config = {},) {
    let {
      format = "DD/MM/YYYY",
      humanize = false,
    } = config;
    if (!timestamp) return "No Date specified";
    const date = new Date(timestamp);
    const _date = date.toLocaleString("default", { day: "2-digit" });;
    const _month = date.toLocaleString("default", { month: "2-digit" });
    const _fullYear = date.toLocaleString("default", { year: "numeric" });
    format = format.replace("DD", _date)
    format = format.replace("MM", _month)
    format = format.replace("YYYY", _fullYear);
    if (humanize) {
      const today = this.formatDateWithLocale(Date.now(), { ...config, humanize: false });
      if (today === format) return "Today";
    }
    return format;
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    let body = {}
    if (this.state.workin) {
      body = {
        userid: this.state.userid,
        workdate: this.state.workdate,
        workin: this.state.workin,
        workout: ''
      }
      // console.log(this.state.rowio.workin);
      // console.log(this.state.status);
      if (this.state.status === "data not found") {
        ApiService.insertWorkIO(body).then((res) => {
          // console.log("Data: ", res);
          if (res.data.status === "ok") {
            Swal.fire({
              icon: 'success',
              title: (res.data.message),
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              if (result.isDismissed) {
                // console.log(res.data.message);
                window.location.href = "/home";
              }
            });
          } else {
            // console.log(res.data.message);
            Swal.fire({
              icon: "error",
              title: (res.data.message),
              showConfirmButton: false,
              timer: 2000
            }).then((result) => {
              if (result.isDismissed) {
                window.history.back();
              }
            });
          }
        });
      } else if (this.state.workout > "17:00:00") {
        body = {
          userid: this.state.userid,
          workdate: this.state.workdate,
          workin: this.state.workin,
          workout: this.state.workout
        }
        // console.log(body);
        ApiService.updateWorkIO(body).then((res) => {
          // console.log("Data: ", res);
          if (res.data.status === "ok") {
            Swal.fire({
              icon: 'success',
              title: (res.data.message),
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              if (result.isDismissed) {
                // console.log(res.data.message);
                window.location.href = "/home";
              }
            });
          } else {
            // console.log(res.data.message);
            Swal.fire({
              icon: "error",
              title: (res.data.message),
              showConfirmButton: false,
              timer: 2000
            }).then((result) => {
              if (result.isDismissed) {
                window.history.back();
              }
            });
          }
        });
      }
    } else {

    }
  }

  componentDidMount() {
    ApiService.getProfile().then((res) => {
      // console.log("Data: ", res);
      if (res.data.status === "ok") {
        this.setState({ userid: res.data.decoded.userid, fullname: res.data.decoded.fullname });
        this.getWorkIOs(res.data.decoded.userid, this.state.workdate)
      } else {
        // console.log(res.data.message);
        Swal.fire({
          icon: "error",
          title: (res.data.message),
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isDismissed) {
            localStorage.clear()
            window.location.href = "/";
          }
        });
      }
    });
  }

  getWorkIOs(id, date) {
    ApiService.getWorkIOs(id, date).then((res) => {
      // console.log("Data: ", res);
      if (res.data.status === "ok") {
        this.setState({ rowio: res.data.workio });
        this.state.isEnabled = this.state.workin.length > 0 && res.data.workio.workout.length > 0;
        // console.log(res.data.workio.workout.length);
      } else {
        this.setState({ status: res.data.status });
      }
    });
  }

  render() {
    // const isEnabled = this.state.workin.length > 0 && this.state.workout.length > 0;
    return (
      <section className="section">
        <div className="container">
          <div className="field is-horizontal">
            <form onSubmit={this.submitForm} className="field-body">
              <div className="field">
                {/* <label className="label">ชื่อ</label> */}
                <div className="control is-expanded has-icons-right">
                  <input className="input" type="hidden" placeholder="Text input" value={this.state.userid} onChange={this.onChange} />
                </div>
              </div>
              <div className="field">
                <label className="label">ชื่อ</label>
                <div className="control is-expanded has-icons-right">
                  <input className="input" type="text" placeholder="Text input" value={this.state.fullname} onChange={this.onChange} disabled />
                </div>
              </div>
              <div className="field">
                <label className="label">เวลาเข้างาน</label>
                {
                  (() => {
                    if (this.state.rowio.workin) {
                      return (
                        <div className="control is-expanded has-icons-right">
                          <input className="input" type="text" placeholder="Text input" value={this.state.rowio.workin} onChange={this.onChange} disabled />
                        </div>
                      )
                    } else {
                      return (
                        <div className="control is-expanded has-icons-right">
                          <input className="input" type="text" placeholder="Text input" value={this.state.workin} onChange={this.onChange} />
                        </div>
                      )
                    }
                  })()
                }
              </div>
              <div className="field">
                <label className="label">เวลาออกงานงาน</label>
                <div className="field is-grouped">
                  {
                    (() => {
                      if (this.state.workout > "17:00:00") {
                        if (this.state.rowio.workout) {
                          return (
                            <div className="control is-expanded has-icons-right">
                              <input className="input" type="text" placeholder="Text input" value={this.state.rowio.workout} onChange={this.onChange} disabled />
                            </div>
                          )
                        } else {
                          return (
                            <div className="control is-expanded has-icons-right">
                              <input className="input" type="text" placeholder="Text input" value={this.state.workout} onChange={this.onChange} />
                            </div>
                          )
                        }
                      } else {
                        return (
                          <div className="control is-expanded has-icons-right">
                            <input className="input" type="text" placeholder="Text input" value="หลัง 17.00 น." disabled />
                          </div>
                        )
                      }
                    })()
                  }
                  <p className="control">
                    <button className="button is-success" type="submit" disabled={this.state.isEnabled}>
                      บันทึก
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
export default Home;
