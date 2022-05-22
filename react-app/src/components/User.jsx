import React from "react";
import "./User.css"
import { getDetailsUserById, updateDetailsUserById } from "../firebase"


class User extends React.Component {
  constructor(props) {
    super(props);
    this.userId = "uYc231SbG8hz97z1K6pohN0ygLk1";
    this.isClicked = true;
    // this.state = {
    //   fields: {},
    //   errors: {},
    // };
    // this.error ={errorFName:"",errorLName:"",errorPhone:""};
     this.state = { fname: "", lname: "", address: "", phoneNumber: "" };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
// aux. functions
   _validationName(str) {
    var hasNumber = /\d/;   
    if(hasNumber.test(str)) {
      return false;
    } 
    return true;
  }
  //
  handleFirstName(event) {
    this.isClicked = false;
    if(this._validationName( event.target.value )){
      this.setState({ fname: event.target.value });
    }else{
      this.error.errorFName = "שם פרטי לא נכון"
    }
  }
  handleLastName(event) {
    this.isClicked = false;
    if(this._validationName( event.target.value )){
      this.setState({ lname: event.target.value });
    }else{
      this.error.errorFName = "שם משפחה לא נכון"
    }
  }
  handleAddress(event) {
    this.isClicked = false;
    this.setState({ address: event.target.value });
  }
  handlePhoneNumber(event) {
    this.isClicked = false;
   
    this.setState({ phoneNumber: event.target.value });
  }

  handleSubmit(event) {
    this.isClicked = true;
    updateDetailsUserById(this.userId, this.state).then(() => {
      alert('הפרטים עודכנו בהצלחה');

    }).catch(() => {
      alert('הפרטים לא עודכנו תנסה שוב');

    });

    event.preventDefault();
  }

  async componentDidMount() {
    const userJson = await getDetailsUserById(this.userId);
    // const temp = {
    //   fields: { fname: userJson.fname, lname: userJson.lname, address: userJson.address, phoneNumber: userJson.phoneNumber },
    //   errors: {},
    // };
    this.setState({ fname: userJson.fname, lname: userJson.lname, address: userJson.address, phoneNumber: userJson.phoneNumber });

  }

  render() {
    const { fname, lname, address, phoneNumber } =this.state;
    return (
      <div className="form-box">
        <form onSubmit={this.handleSubmit}>
          <label>

            <input type="text" placeholder={fname} onChange={this.handleFirstName} />
            <span> </span>
            :שם פרטי
          </label>
          <label value="Ayy"></label>
          <label>

            <input type="text" placeholder={lname} onChange={this.handleLastName} />
            <span> </span>
            :שם משפחה
          </label>
          <label>

            <input type="text" placeholder={address} onChange={this.handleAddress} />
            <span> </span>
            :כתובת
          </label>
          <label>
            <input type="text" placeholder={phoneNumber} onChange={this.handlePhoneNumber} />
            <span> </span>
            :נייד
          </label>
          <input style={{backgroundColor: '#343741', borderColor : '#343741', color : '#ffff' }}className="btnSubmit" type="submit" value="עדכון" disabled={this.isClicked} />
        </form>
      </div>
    );
  }
}

export default User;