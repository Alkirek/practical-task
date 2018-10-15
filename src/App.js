import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import ninjas from './img/7ninjas.svg';
import logo from './img/logo.svg';
import './scss/App.scss';
import Person from './Components/Component'
import Cart from './Components/Cart'
import Shipping from './Components/Shipping'


class App extends Component {

  // state = {
  //   persons: [
  //     { name: 'Max', age: 28 },
  //     { name: 'asdasd', age: 18 },
  //     { name: 'Maasdasdx', age: 26 },
  //   ]
  // }

  // switchNameHandler = () => {
  //   console.log("clicked!");
  //   this.setState({
  //     persons: [
  //       { name: 'Maximilian', age: 12 },
  //       { name: 'asdasd', age: 18 },
  //       { name: 'Maasdasdx', age: 286 },
  //     ]
  //   })
  // }

  render() {
    return (


      <Router>
        <div className="App">

          <div className="App__box">
            <div className="App__box--header">
              <img src={ninjas} alt="7ninjas" />

              <h1>Front-end Developer</h1>

              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/shipping">Shipping</Link>
                </li>
              </ul>

            </div>

            <div className="App__box--content">

              <div className="Render__box--background"></div>

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

    {/* <button onClick={this.switchNameHandler}>Switch name</button>
         <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
         <Person name={this.state.persons[1].name} age={this.state.persons[1].age} />
         <Person name={this.state.persons[2].name} age={this.state.persons[2].age} /> */}

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'test'));
  }
}

export default App;
