import React, { Component } from 'react';
import { Link }             from "react-router-dom";
import Product              from './Product';

const API = 'http://5bbfa52072de1d00132537d3.mockapi.io/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products:           [],
      isLoading:          false,
      error:              null,
      classButtonIncrase: '',
      classButtonDecrase: '',
    };
  }
  // Increment button 
  incrementQuantity = ( event, id ) => {
    const prodIndex = this.state.products.findIndex( p => {
      return p.id === id;
    });
    // Copy array to not mutate
    const product = {
      ...this.state.products[prodIndex]
    };
    // Condition checking the state of quantity + button state
    if (( product.quantity >= 100 )) {
      product.quantity++;
      product.disabled = 'disabled';
    }
    else {
      product.quantity++;
      product.disabled2 = '';
    }
    // Push new array
    const products      = [...this.state.products];
    products[prodIndex] = product;

    this.setState( { products: products } );
  }
  decrementQuantity = ( event, id ) => {
    const prodIndex = this.state.products.findIndex(p => {
      return p.id === id;
    });
    // Copy array to not mutate
    const product = {
      ...this.state.products[prodIndex]
    };
    // Condition checking the state of quantity + button state
    if ( product.quantity <= 1 ) {
      product.quantity--;
      product.disabled2 = 'disabled';
    } else {
      product.quantity--;
      product.disabled = '';
    }
    // Push new array
    const products      = [ ...this.state.products ];
    products[prodIndex] = product;
    this.setState( { products: products } );
  }
  // Delete single object in array
  delete = ( index, e ) => {
    const products = Object.assign( [], this.state.products );
    products.splice( index, 1 );
    this.setState( { products: products } )
  }
  componentDidMount() {
    // Fetching API + loading state/error
    this.setState( { isLoading: true } );
    fetch(API)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...' + " Code: " + response.status);
        }
      })
      .then(data => this.setState({ products: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }
  // Sum all products prices
  priceSummary() {
    let tab = this.state.products;
    let sum = 0.00
    for (let i = 0; i < tab.length; i++) {
      sum += parseFloat( tab[i].price ) * parseFloat( tab[i].quantity );
    }
    return sum;
  }

  passVars() {
    this.props.changeLink( { sum: this.priceSummary(), quantity: this.state.products.length } );
  }
  
  render() {
    //Render if waiting for API
    const { products, isLoading, error } = this.state;
    if ( error ) {
      return <p>{error.message}</p>;
    }
    if ( isLoading ) {
      return <p>Loading...</p>;
    }
   
    return (
      // Product component map
      <div className="Products">
        {products.map((product, index) => {
          return <Product
            delete={() => this.delete(index)}
            product_img={product.product_img}
            title={product.title}
            subtitle={product.subtitle}
            price={product.price}
            quantity={product.quantity}
            end_price={(parseFloat(product.price) * product.quantity).toFixed(2)}
            key={product.id}
            classButtonIncrase={product.disabled}
            classButtonDecrase={product.disabled2}
            increment={(event) => this.incrementQuantity(event, product.id)}
            decrement={(event) => this.decrementQuantity(event, product.id)} />
        }
        )}
        <div className="Products__price">
          <p>
           {parseFloat( this.priceSummary()).toFixed(2) } <span>€</span>
          </p>
          
          <Link to="/shipping" onClick={ this.passVars.bind(this) } >Buy</Link>

        </div>
      </div>
    );
  }
}
export default Cart;