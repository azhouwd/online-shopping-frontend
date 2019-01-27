import React from 'react';
import ProductList from './components/ProductList.js';
import Cart from './components/Cart.js';
import Scroll from './components/Scroll.js';
import './App.css';
import Modal from './components/Modal.js';
import SortSize from './components/SortSize.js';
import Navigation from './components/Navigation.js';
import Register from './components/Register.js';
import SignIn from './components/SignIn.js';
import Profile from './components/Profile.js';
import Order from './components/Order.js';

const shortid = require('shortid');

class App extends React.Component {
	constructor(){
		super();
		this.state = {
		products:[],
		toggleCart: false,
		sizefilter: false,
		filteredlist: [],
		cartlist:[],
		images:[],
		route:'notsignedin',
		user:{
			id:null,
			name:'',
			phone:'',
			address:''
		},
		order_table:[]
	}
}

	componentDidMount() {
		const authToken = window.sessionStorage.getItem('token');
		if(authToken){
			fetch('https://mysterious-earth-64717.herokuapp.com/signin',{
				method:'post',
				headers:{
					'Content-Type':'application/json',
					'authorization': authToken
				}
			}).then(resp=>resp.json())
			  .then(data=>{
			  	 this.loadUser(data);
			  	 this.setRoute('signedin')
			  })
		}
		fetch("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=3x0FnfZT83D9M9Y0ObZdB2uuQ6D9JnN1&limit=40")
		.then(response=>response.json())
		.then(result=>this.setState({images:result.data}))

		fetch("https://react-shopping-cart-67954.firebaseio.com/products.json")
		.then(response=>response.json())
		.then(data=>this.setState({products:data.products}))
	}

	onToggle = () => {
		this.setState(prevState=>({
			toggleCart:!prevState.toggleCart
		}))
	}

	loadUser = (data) => {
		fetch(`https://mysterious-earth-64717.herokuapp.com/profile/${data.id}`,{
			method: 'get',
			authorization: window.sessionStorage.getItem('token')
		})
		.then(response=>response.json())
		.then(response=>{this.setState({user:{
			id:response.id,
			name:response.name,
			phone:response.phone,
			address:response.address
		}})})
	}

	onAddClick = (name) => {
		const { cartlist, products } = this.state;
		const filtered = products.filter(el=>{
			return el.title === name; 
		})
		let	cartItem = {id:filtered[0].id,name:filtered[0].title,price:filtered[0].price,quantity:1};
		if(cartlist.length === 0){
			let newlist = [...cartlist,cartItem];
			this.setState({cartlist:newlist,toggleCart:true});
		}else if(cartlist.length !== 0){
		for(let i=0;i<cartlist.length;i++){
			if(cartItem.name === cartlist[i].name){
				let addQuantity = [...cartlist];
				addQuantity[i].quantity = addQuantity[i].quantity+1;
				return this.setState({cartlist:addQuantity,toggleCart:true});
			}
			else{
				let addItem = [...cartlist,cartItem];
				this.setState({cartlist:addItem,toggleCart:true});
			}
		}
	}
	}

	removeItem = (index) => {
		const filtered = this.state.cartlist.filter(el=>{
			return el.name!== index
		})
		this.setState({cartlist:filtered});
	}

	sortSize = (e) => {
		const filtered = this.state.products.filter(el=>{
			return el.availableSizes.includes(e.target.innerHTML);
		})
		this.setState({sizefilter:true,filteredlist:filtered});
	}

	removeFilter = () => {
		this.setState({sizefilter:false});
	}

	onSignOutClick = () => {
		this.setRoute('notsignedin');
		window.sessionStorage.removeItem('token');
	}

	sortByPrice = () => {
		let result = this.state.products.sort(function(a,b){
			if(a.price>b.price){
				return -1;
			}
		})
		this.setState({products:result})
	}

	sortByName = () => {
		let result = this.state.products.sort((a,b)=>{
			if(a.title<b.title){
				return -1;
			}
			else{
				return 1;
			}
		})
		this.setState({products:result});
	}

	checkOut = (total) =>{
		if(this.state.route === 'notsignedin'){
			return alert('Please sign in first!');
		}
		const order_id = shortid.generate();
		this.state.cartlist.forEach(data=>{
			fetch('https://mysterious-earth-64717.herokuapp.com/checkout',{
				method:'post',
				headers:{
					'Content-Type':'application/json',
					'authorization':window.sessionStorage.getItem('token')
				},
				body:JSON.stringify({
					order_id:order_id,
					product_id:data.id,
					product_name:data.name,
					quantity:data.quantity,
					total_price:data.price*data.quantity,
					user_id:this.state.user.id
				})
			}).then(response=>response.json())
			  .then(data=>console.log(data))
		})
		alert(`Total Amount is ${total}`);
		this.setState({cartlist:[]});
	}

	setRoute = (route) => {
		if(route === 'notsignedin'){
			this.setState({user:{
				name:'',
				phone:'',
				address:''
			}});
		}
		this.setState({route:route});
	}

render() {
	const { products,sizefilter,filteredlist,cartlist,toggleCart,route,user,images } = this.state;
	console.log(user);
	console.log(this.state.products)
	return(
	<div>
	<Navigation setRoute={this.setRoute} route={route} onSignOutClick={this.onSignOutClick}/>
	<div className='container'>
		<SortSize sortSize={this.sortSize} removeFilter={this.removeFilter} sortByPrice={this.sortByPrice} sortByName={this.sortByName}/>
		<ProductList product={products} onAddClick={this.onAddClick} images={images}
					 sizefilter={sizefilter} filteredlist={filteredlist} />
		<button className="showcart" onClick={this.onToggle} >{'Cart'}</button>
		<Modal>
		  {  route === 'register' ? <Register setRoute={this.setRoute} loadUser={this.loadUser}/> 
		   : route === 'signin' ? <SignIn setRoute={this.setRoute} loadUser={this.loadUser}/>
		   : route === 'profile'? <Profile user={user} setRoute={this.setRoute} 
		   								   loadUser={this.loadUser} setRoute={this.setRoute} />
		   : route === 'order_history'? <Order setRoute={this.setRoute} id={this.state.user.id}/> : null
		  }
		</Modal>
	{toggleCart &&
		<div className='cartregion'>
		<div className='close' onClick={this.onToggle}>&times;</div>
		<Scroll>
			<Cart cartlist={cartlist} removeItem={this.removeItem} checkOut={this.checkOut} />
		</Scroll>
		</div>
	}
	</div>
	</div>
	)
}
}

export default App;