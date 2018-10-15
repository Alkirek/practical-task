import React, { Component } from 'react';
import icon_delete from './../img/delete.png';

const API = 'http://5bbfa52072de1d00132537d3.mockapi.io/cart';
const DEFAULT_QUERY = 'redux';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      isLoading: false,
      error: null,
    };
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

      <h2>SHIPPING PAGE</h2>
        {products.map(product =>
          <div className="Products__row" key={product.id}>
            <div className="Products__row--image">
              <img src={product.product_img} />
            </div>
            <div className="Products__row--description">
              <h2>{product.title}</h2>
              <p>{product.subtitle}</p>
            </div>
            <div className="Products__row--options">
              <div className="icon">
                <img src={icon_delete} alt="Delete" />
              </div>

              <button>-</button>
              <input type="text" value="1" />
              <button>+</button>
              <p>
                {product.price} <span>€</span>
              </p>

            </div>
          </div>
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