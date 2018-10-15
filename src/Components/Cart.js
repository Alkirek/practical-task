import React, { Component } from 'react';
import icon_delete from './../img/delete.png';
import Product from './Product';

const API = 'http://5bbfa52072de1d00132537d3.mockapi.io/cart';
const DEFAULT_QUERY = 'redux';

class Cart extends Component {


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




  incrementQuantity = (event, id) => {
    const personIndex = this.state.products.findIndex(p => {
      return p.id === id;
    });

    const product = {
      ...this.state.products[personIndex]
    };

    const test = "testowy";

    if ((product.quantity >= 9) ) {
      console.log("osiagnieto max");
      product.quantity++;
      this.state.classButtonIncrase = test;
      this.children = test;
        
    }
    else {
      product.quantity++;
      this.state.classButtonDecrase = '';
    }
    
    
    console.log(product.quantity * product.price);
    const products = [...this.state.products];
    products[personIndex] = product;

    this.setState({ products: products });
  }

  decrementQuantity = (event, id) => {
    const personIndex = this.state.products.findIndex(p => {
      return p.id === id;
    });

    const product = {
      ...this.state.products[personIndex]
    };

    // Button state nad quantity decrement
    if (product.quantity <= 1 ) {
      console.log("osiagnieto min");
      product.quantity--;
      this.state.classButtonDecrase = 'disabled';
    }
    else {
      product.quantity--;
      this.state.classButtonIncrase = '';
    }

    const products = [...this.state.products];
    products[personIndex] = product;

    this.setState({ products: products });
  }

  delete = (index, e) => {
    const products = Object.assign([], this.state.products);
    products.splice(index, 1);
    this.setState({ products: products })
  }

  componentDidMount() {

    this.setState({ isLoading: true });

    fetch(API)
      .then(response => {
        if (response.ok) {
          console.log(response)
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ products: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));


  }

  render() {



    const { products, isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }



    return (

      <div className="Products">
        {products.map((product, index) => {
          return <Product
            delete={() => this.delete(index)}
            product_img={product.product_img}
            title={product.title}
            subtitle={product.subtitle}
            price={product.price}
            quantity={product.quantity}
            end_price={product.price * product.quantity}
            key={product.id}
            classButtonIncrase={this.state.classButtonIncrase}
            classButtonDecrase={this.state.classButtonDecrase}
            increment={(event) => this.incrementQuantity(event, product.id)}
            decrement={(event) => this.decrementQuantity(event, product.id)}  />
            
        }
        
        )}

        <div className="Products__price">
          <p>
            225 <span>€</span>
          </p>

          <button>Buy</button>


        </div>

      </div>
      

    );

    
  }
}

export default Cart;