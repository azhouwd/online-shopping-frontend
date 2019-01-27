import React from 'react';
import './Profile.css';

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			id:this.props.user.id,
			name:this.props.user.name,
			phone:this.props.user.phone,
			address:this.props.user.address
		}
	}

	onNameChange = (event) => {
		this.setState({name:event.target.value});
	}

	onPhoneChange = (event) => {
		this.setState({phone:event.target.value});
	}

	onAddressChange = (event) => {
		this.setState({address:event.target.value});
	}

	onSaveClick = (user) => {
		fetch('https://mysterious-earth-64717.herokuapp.com/updateProfile',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				id:this.props.user.id,
				name:user.name,
				phone:user.phone,
				address:user.address
			})
		}).then(response=>{
			this.props.loadUser(this.state);
			this.props.setRoute('signedin')
		})
	}

	render(){
		const { name,phone,address } = this.state;
		return (
			<div className='personalInfoContainer'>
			<div className="profilebox">
		    <h1 style={{color:'white'}} >Personal Information</h1>
		    <hr />
		    <div className='personalInfo'>
		    	<label>Name: <i>{name}</i></label>
		    	<input type='text' className='updatename' placeholder='Please input new name' onChange={this.onNameChange}/>
		    	<label>Phone Number: <i>{phone}</i></label>
		    	<input type='text' className='updatephone' placeholder='Please input new phone number' onChange={this.onPhoneChange}/>
				<label>Address: <i>{address}</i></label>
				<input type='text' className='updateaddress' placeholder='Please input new address' onChange={this.onAddressChange}/>
			</div>
			<div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
		   <button className='savebtn' onClick={()=>this.onSaveClick(this.state)}>Save</button>
		   <button className='savebtn' onClick={()=>this.props.setRoute('signedin')}>Cancel</button>
		   </div>
		   </div>
		   </div>
	   )
	}
}

export default Profile;