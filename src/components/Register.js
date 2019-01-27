import React from 'react';
import './Register.css';

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email:'',
			name:'',
			password:'',
			phone:'',
			address:''
		}
	}

	onEmailChange = (event) => {
		this.setState({email:event.target.value});
	}

	onNameChange = (event) => {
		this.setState({name:event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password:event.target.value});
	}

	onPhoneChange = (event) => {
		this.setState({phone:event.target.value});
	}

	onAddressChange = (event) => {
		this.setState({address:event.target.value});
	}

	onRegisterClick = () => {
		fetch('https://mysterious-earth-64717.herokuapp.com/register',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body: JSON.stringify({
				email:this.state.email,
				name:this.state.name,
				password:this.state.password,
				phone:this.state.phone,
				address:this.state.address
			})
		})
		.then(res=>res.json())
		.then(user=>{
			if(user.id){
				this.props.loadUser(user);
				this.props.setRoute('signedin');
			}
		});
	}

render(){
	return (
	   <div className='registerContainer'>
		<div className="registerbox">
	    <h1 id='registertext' style={{fontFamily:'fantasy'}}>Registration</h1>
	    <hr />
	    <div className='personalInfo'>
		  <input type="text" placeholder="Email" required onChange={this.onEmailChange}/>
		  <input type="text" placeholder="Name" required onChange={this.onNameChange}/>
		  <input type="password" placeholder="Password" required onChange={this.onPasswordChange}/>
		  <input type="tel" placeholder="phone" required onChange={this.onPhoneChange} />
		  <input type="text" placeholder="mail address" required onChange={this.onAddressChange} />
		</div>
		<div id='registerbtns'>
	   <button className='registerbtn' onClick={this.onRegisterClick}>Register</button>
	   <button className='registerbtn' onClick={()=>this.props.setRoute('notsignedin')}>Cancel</button>
	   </div>
	   </div>
	   </div>
	)
	}
}

export default Register;