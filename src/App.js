import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import ninjas from './img/7ninjas.svg';
import Cart from './Components/Cart';
import Shipping from './Components/Shipping';
import './scss/App.scss';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sum: 0,
      quantity: 0
    };
  };

  updateState(data) {
    this.setState({
      sum: data.sum,
      quantity: data.quantity
    })
  }

  render() {
    return (
      // Set Route
      <Router>
        <div className="App">
          <div className="App__box">
            <div className="App__box--header">
              <img src={ninjas} alt="7ninjas" />

              <h1>Front-end Developer</h1>
              <br></br>
            </div>

            <div className="App__box--content">
              <div className="Render__box--background"></div>
              {/* Display Routes */}
              <div className="Render__box">

                <Route exact path='/' component={() => <Redirect to="/cart" />} />
                {/* <Route path="/cart" component={Cart} /> */}

                <Route
                  path='/cart'
                  render={(props) => <Cart changeLink={this.updateState.bind(this)} isAuthed={true} />}
                />

                <Route
                  path='/shipping'
                  render={(props) => <Shipping data={{ sum: this.state.sum, quantity: this.state.quantity }} isAuthed={true} />}
                />

                {/* <Route path="/shipping" component={Shipping} /> */}

              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;