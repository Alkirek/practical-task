import React, { Component } from 'react';
import icon_delete from './../img/delete.png';

// Get props from Cart.js
const product = (props) => {

  return (

    <div className="Products__row" id={props.key}>
      <div className="Products__row--image">
        <img src={props.product_img} />
      </div>
      <div className="Products__row--description">
        <h2>{props.title} {props.key}</h2>
        <p>{props.subtitle}</p>
      </div>
      <div className="Products__row--options">
        <div className="icon">
          <img onClick={props.delete} src={icon_delete} alt="Delete" />
        </div>

        <button onClick={props.decrement} disabled={props.classButtonDecrase}>-</button>

        <input type="text" value={props.quantity} />
        <div>
          <button onClick={props.increment} disabled={props.classButtonIncrase}>+</button>
        </div>
        <p>
          {props.end_price} <span>€</span>
        </p>

      </div>
    </div>
  )
};

export default product;