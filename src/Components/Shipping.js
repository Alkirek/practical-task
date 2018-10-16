import React, { Component } from 'react';

const API = 'http://5bbfa52072de1d00132537d3.mockapi.io/cart';

class Shipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false,
      error: null,
      classButtonIncrase: '',
      classButtonDecrase: '',
    }
  }

  // Increment button 
  incrementQuantity = (event, id) => {
    const prodIndex = this.state.products.findIndex(p => {
      return p.id === id;
    });
    // Copy array to not mutate
    const product = {
      ...this.state.products[prodIndex]
    };
    // Condition checking the state of quantity + button state
    if ((product.quantity >= 100)) {
      product.quantity++;
      product.disabled = 'disabled';
    }
    else {
      product.quantity++;
      product.disabled2 = '';
    }
    // Push new array
    const products = [...this.state.products];
    products[prodIndex] = product;

    this.setState({ products: products });
  }
  decrementQuantity = (event, id) => {
    const prodIndex = this.state.products.findIndex(p => {
      return p.id === id;
    });
    // Copy array to not mutate
    const product = {
      ...this.state.products[prodIndex]
    };
    // Condition checking the state of quantity + button state
    if (product.quantity <= 1) {
      product.quantity--;
      product.disabled2 = 'disabled';
    }
    else {
      product.quantity--;
      product.disabled = '';
    }
    // Push new array
    const products = [...this.state.products];
    products[prodIndex] = product;

    this.setState({ products: products });
  }
  // Delete single object in array
  delete = (index, e) => {
    const products = Object.assign([], this.state.products);
    products.splice(index, 1);
    this.setState({ products: products })
  }
  componentDidMount() {
    // Fetching API + loading state/error
    this.setState({ isLoading: true });
    fetch(API)
      .then(response => {
        if (response.ok) {

          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ products: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  // Sum all products prices
  priceSummary() {
    let tab = this.state.products;
   console.log(tab);
  }

  render() {
    this.priceSummary();

    return (

      <div className="Form">
        <div className="Form__box">
          <div className="Form__box--row">
            <p>Name*</p>
            <input type="text" value="" />
          </div>
          <div className="Form__box--row">
            <p>Address*</p>
            <input type="text" value="" />
          </div>
          <div className="Form__box--row">
            <p>Phone</p>
            <input type="text" value="" />
          </div>
          <div className="Form__box--row">
            <p>E-mail</p>
            <input type="text" value="" />
          </div>
          <div className="Form__box--row">
            <p>Shipping options</p>
            <input type="text" value="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Shipping;