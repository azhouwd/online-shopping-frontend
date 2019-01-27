import React from 'react';
import './Order.css';

class Order extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			orders:[],
			user_id:this.props.id
		}
	}

	componentDidMount(){
		fetch(`https://mysterious-earth-64717.herokuapp.com/getOrderHistory/${this.state.user_id}`,{
			method:'get',
			headers:{'Content-Type':'application/json'}
		})
		.then(response=>response.json())
		.then(data=>this.setState({orders:data}))
	}

	render(){
		console.log(this.state.orders)
		const result = this.state.orders.map(data=>{
			return <tr>
						<td>{data.order_id}</td>
						<td>{data.product_name}</td>
						<td>{data.quantity}</td>
						<td>{data.total_price}</td>
				   </tr>
		})
		return(
			<div className='personalInfoContainer'>
			<div className="orderhistorybox">
		    <h1 style={{color:'white',fontFamily:'fantasy'}} >Order History</h1>
		    <span onClick={()=>this.props.setRoute('signedin')}>&times;</span>
		    <hr />
		    <div className='order_table_content'>
		    <table style={{width:"100%"}}>
		    <tbody>
			  <tr height='50'>
			    <th>Order ID</th>
			    <th>Product Name</th> 
			    <th>Quantity</th>
			    <th>Price</th>
			  </tr>
			  {result}
			  </tbody>
			</table>
			</div>
		   </div>
		   </div>
		)
	}
}

export default Order;