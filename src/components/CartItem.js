import React from 'react';
import './CartItem.css';

const CartItem = ({name,total_price,quantity}) => {
	return(
		<div id='cart_container' >
			<h4>Product Name: <i>{name}</i></h4>
			<p>Quantity: <i>{quantity}</i></p>
			<p>Total Price: <i>{total_price}</i></p>
		</div>
	)
}

export default CartItem;