import React from 'react';
import './ProductItem.css';

const ProductItem = ({name,price,shipping,images,sizes}) => {
	const size = sizes.map(el=>{
		return <i>{`${el}   `}</i>
	})
	return(
		<div className='item_detail'>
		   <h3 id='item_name'>{name}</h3>
		   <p id='item_shipping'>{shipping}</p>
		   <p id='item_price'>{`$${price}`}</p>
		   <p id='item_size' style={{marginTop:'-10px'}}>Sizes: {size}</p>
		</div>
	)
}

export default ProductItem;