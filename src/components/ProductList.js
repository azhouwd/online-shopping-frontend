import React from 'react';
import ProductItem from './ProductItem.js';
import './ProductList.css';

const ProductList = ({product,onAddClick,sizefilter,filteredlist}) => {
	const result = product.map(el=>{
		return (
			<div key={el.id} className='items_nofilter' >
				<ProductItem name={el.title} price={el.price}
				shipping={el.isFreeShipping?'Free Shipping':'Paid Shipping'} sizes={el.availableSizes}/>
				<button className='addButton' onClick={()=>onAddClick(el.title)} >{'Add to Cart'}</button>
			</div>
		)
	})

	const filtered = filteredlist.map(el=>{
		return (
			<div key={el.id} className='items_filtered' >
				<ProductItem name={el.title} price={el.price}
				shipping={el.isFreeShipping ? 'Free Shipping':'Paid Shipping'} sizes={el.availableSizes}/>
				<button className='addButton' onClick={()=>onAddClick(el.title)} >{'Add to Cart'}</button>
			</div>
		)
	})

	return(
	<div>
	{ sizefilter === false ?
		<div className='products'>{result}</div>
		:
		<div className='filtered'>{filtered}</div>
	}
	</div>
	)
}

export default ProductList;