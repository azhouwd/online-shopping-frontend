import React from 'react';
import './SortSize.css';

const SortSize = ({sortSize,removeFilter,sortByPrice,sortByName}) => {
	return (
		<div className='sort'>
			<h3 style={{margin:'25px 0 0 40px'}} >Sizes</h3>
			<div style={{display:'flex',marginLeft:'30px',flexWrap:'wrap'}} >
				<button className='sortbtn' onClick={sortSize}>{'XL'}</button>
				<button className='sortbtn' onClick={sortSize}>L</button>
				<button className='sortbtn' onClick={sortSize}>M</button>
				<button className='sortbtn' onClick={sortSize}>S</button>
				<button className='sortbtn' onClick={removeFilter}>Cancel</button>
			</div>
			<div style={{display:'flex',marginLeft:'30px',flexWrap:'wrap',flexDirection:'column',marginTop:'80px'}}>
				<button style={{width:'150px',height:'20px'}} onClick={sortByPrice}>Sort By Price</button>
				<button style={{width:'150px',height:'20px'}} onClick={sortByName}>Sort By Name</button>
			</div>
		</div>
	)
}

export default SortSize;