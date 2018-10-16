import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import ninjas from './img/7ninjas.svg';
import './scss/App.scss';
import Cart from './Components/Cart'
import Shipping from './Components/Shipping'

class App extends Component {

  render() {
    return (
      // Set Route
      <Router>
        <div className="App">

          <div className="App__box">
            <div className="App__box--header">
              <img src={ninjas} alt="7ninjas" />

              <h1>Front-end Developer</h1>

            </div>

            <div className="App__box--content">
              <div className="Render__box--background"></div>
              {/* Display Routes */}
              <div className="Render__box">
                
                <Route exact path='/' component={() => <Redirect to="/cart" />} />
                <Route path="/cart" component={Cart} />
                <Route path="/shipping" component={Shipping} />

              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
