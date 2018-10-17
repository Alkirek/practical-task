import React, { Component } from 'react';

class Shipping extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false,
      error: null,
      classButtonIncrase: '',
      classButtonDecrase: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      shipping: [
        ['ninjPost -', ' FREE SHIPPING'],
        ['D7L -', ' 15.99 PLN'],
        ['post -', ' 7.99 PLN']
      ],
      disabled: '',
      buttonControl: '',
      nameInputState: '',
      addressInputState: '',
      phoneInputState: '',
      emailInputState: '',
    };

  }

  // Check cart price for free shipping
  setFreeShipping() {
    if (this.props.data.sum > 200) {
      for (var i = 0; i < this.state.shipping.length; i++) {
        this.state.shipping[i][1] = 'free shipping';
      }
    }
  }
  //Check products quantity for disable NinjPost
  checkNinjPost() {
    if (this.props.data.quantity > 3) {
      this.state.disabled = 'disabled'
    } else {

    }
  }
  // Event check all inputs
  nameChangeHandler = (event) => {
    if (event.target.name == 'name') {
      this.setState({
        name: event.target.value,
      })
    }
    if (event.target.name == 'email') {
      this.setState({
        email: event.target.value,
      })
    }
    if (event.target.name == 'phone') {
      this.setState({
        phone: event.target.value,
      })
    }
    if (event.target.name == 'address') {
      this.setState({
        address: event.target.value,
      })
    }
  }
  // Form inputs validation
  checkName() {
    if (this.state.name.match(/^([a-z]*[a-z]){3}[a-z]*$/) != null) {
      this.state.nameInputState = "correct";
      return true;
    } else {
      this.state.nameInputState = "error";
      return false;
    }
  }
  checkAddress() {
    if (this.state.address != '') {
      this.state.addressInputState = "correct";
      return true;
    } else {
      this.state.addressInputState = "error";
      return false;
    }
  }
  checkPhone() {
    if ((this.state.phone.match(/^\d{9}$/) != null) || (this.state.phone == '')) {
      this.state.phoneInputState = "correct";
      return true;
    } else {
      this.state.phoneInputState = "error";
      return false;
    }
  }
  checkEmail() {
    if ((this.state.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) != null) && (this.state.email != '')) {
      this.state.emailInputState = "correct";
      return true;
    } else {
      this.state.emailInputState = "error";
      return false;
    }
  }
  // Enable button if ala inputs true
  checkButton() {
    if (this.checkEmail() === false || this.checkPhone() === false || this.checkAddress() === false || this.checkName() === false) {
      this.state.buttonControl = 'disabled';
    } else {
      this.state.buttonControl = '';
    }
  }

  render() {
    this.checkName();
    this.checkAddress();
    this.checkPhone();
    this.checkEmail();

    this.checkNinjPost();
    this.setFreeShipping();
    this.checkButton();

    return (

      <div className="Form">

        <div className="Form__box">
          <div className="Form__box--row">
            <p>Name*</p>
            <input class={this.state.nameInputState} type="text" name="name" onChange={this.nameChangeHandler} />
          </div>
          <div className="Form__box--row">
            <p>Address*</p>
            <input class={this.state.addressInputState} type="text" name="address" onChange={this.nameChangeHandler} />
          </div>
          <div className="Form__box--row">
            <p>Phone</p>
            <input class={this.state.phoneInputState} type="text" name="phone" onChange={this.nameChangeHandler} />
          </div>
          <div className="Form__box--row">
            <p>E-mail</p>
            <label>
            <input class={this.state.emailInputState} type="text" name="email" onChange={this.nameChangeHandler} />
            <span>Invalid e-mail</span>
            </label>
          
          </div>
          <div className="Form__box--row">
            <p>Shipping options</p>
            <select id="shipping" >
              <option disabled={this.state.disabled}>{this.state.shipping[0][0] + this.state.shipping[0][1]}</option>
              <option>{this.state.shipping[1][0] + this.state.shipping[1][1]}</option>
              <option>{this.state.shipping[2][0] + this.state.shipping[2][1]}</option>
            </select>

          </div>
          <button disabled={this.state.buttonControl}>PAY</button>
        </div>

      </div>
    );

  }

}

export default Shipping;