import axios from 'axios'
import React from 'react'

class Navi extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
            id:'',
            singleFeed:{},
            post_status :'',
            profileimage: '',
            name:'',
            post: [],
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3000/logincheck', this.state.config)
            .then((response) => {
              //alert(response.data._id);
                this.setState({
                    id:response.data._id,
                    user: response.data,
                    fname:response.data.name,
                    email:response.data.email,
                    phone:response.data.phone,
                    gender:response.data.gender,
                    dob:response.data.dob
                })
            })
        }
        
LogOut=()=>{
    //delete token in browser and logout from backend
    axios.post('http://localhost:3000/logout')
    localStorage.removeItem('token')
    
  
  }

       render(){

        return(
<div className="col-md-3">
<div className="box box-solid">
  <div className="box-header with-border">
    <h3 className="box-title">Welcome, <i>{this.state.user.fullname}</i> <b></b></h3>
  </div>
  <div className="box-body no-padding">
    <ul className="nav nav-pills nav-stacked">
      <li><a href="Editvendor"><i className="fa fa-user"></i> Edit Profile</a></li>
      <li><a href="Venue"><i className="fa fa-home"></i>  Add Venue</a></li>
      <li><a href="Business"><i className="fa fa-suitcase"></i>  Add Business</a></li>
      <li><a href="Myvenue"><i className="fa fa-retweet"></i> My venue</a></li>
      <li><a href="Mybusiness"><i className="fa fa-list"></i> My Business</a></li>
      {/* <li><a href="newsfeed"><i className="fa fa-dashboard"></i> News feed</a></li> */}
      <li><a href="Login" onClick={this.LogOut}><i className="fa fa-arrow-circle-o-right"></i> Logout</a></li>
    </ul>
  </div>
</div>
</div>
         
         )
        }
        
 
 }
 export default Navi