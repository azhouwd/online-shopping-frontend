import React from 'react';
import './Navigation.css';

const Navigation = ({setRoute,route,onSignOutClick}) => {
	return(
		<div>
		{ route === 'signedin' || route === 'profile' || route === 'order_history' ?
		  <div id='navigation'> 
		  <p className='navItem' onClick={()=>setRoute('order_history')}>My Order</p>
		  <p className='navItem' onClick={()=>setRoute('profile')}>Profile</p>
		  <p className='navItem' onClick={onSignOutClick}>Log Out</p>
		  </div>
		  : route === 'notsignedin' || route === 'register' || route === 'signin'?
		  <div id='navigation'>
		  <p className='navItem' onClick={()=>setRoute('signin')}>Sign In</p>
		  <p className='navItem' onClick={()=>setRoute('register')}>Register</p>
		  </div>:null
		}
		</div>
	)
}

export default Navigation;