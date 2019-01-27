import React from 'react';
import './Cart.css';
import CartItem from './CartItem.js';

const Cart = ({cartlist,removeItem,checkOut}) => {
	const inStock = cartlist.map((el,index)=>{
	return (
		<div className='cart_item' key={index}>
			<p className='remove_item' onClick={()=>removeItem(el.name)}>&times;</p>
			<CartItem name={el.name} total_price={el.quantity*el.price} quantity={el.quantity} />
		</div>
	)
	})

	const subtotal = cartlist.reduce((acc,num)=>{
		return acc=acc+num.price*num.quantity
	},0)

	return(
		<div className='cart_stuff'>
			<div style={{color:'white'}} >{inStock}</div>
			<p style={{color:'white'}} >{`Subtotal:${subtotal}`}</p>
			<button className='checkout' onClick={()=>checkOut(subtotal)}>{'Check Out'}</button>
		</div>
	)
}
export default Cart;