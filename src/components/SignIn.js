import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signinEmail:'',
			signinPassword:''
		}
	}

	onEmailChange = (event) => {
		this.setState({signinEmail:event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signinPassword:event.target.value});
	}

	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token',token);
	}

	onSigninClick = () => {
	fetch('https://mysterious-earth-64717.herokuapp.com/signin', {
	  method: 'post',
	  headers: {'Content-Type': 'application/json'},
	  body: JSON.stringify({
	    email: this.state.signinEmail,
	    password: this.state.signinPassword
	  })
	})
	  .then(response => response.json())
	  .then(user => {
	    if (user.id) {
	      this.saveAuthTokenInSession(user.token);
	      this.props.loadUser(user);
	      this.props.setRoute('signedin');
	    }
	  })
	}

    render(){
		return (
		   <div className='signinContainer'>
			<div className="signinbox">
		    <h1 id='signintext'>Sign In</h1>
		    <hr />
		    <div className='personalInfo' >
			  <input type="text" placeholder="Email" required onChange={this.onEmailChange}/>
			  <input type="password" placeholder="Password" required onChange={this.onPasswordChange}/>
			</div>
			<div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:'20px'}} >
		   <button className='signinbtn' onClick={this.onSigninClick}>Sign In</button>
		   <button className='signinbtn' onClick={()=>this.props.setRoute('notsignedin')}>Cancel</button>
		   </div>
		   </div>
		   </div>
		)
	}
}

export default SignIn