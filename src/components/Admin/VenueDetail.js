import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router';
import Navi from '../Admin/AdminNavi';
import '../../css/Table.css'
import {NavLink} from 'react-router-dom'

class VenueDetail extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      id: '',
      singleFeed: {},
      post_venuetype: '',
      profileimage: '',
      name: '',
      post: [],
      user: {},
      venuename: '',
      phone: '',
      address: '',
      email: '',
      venuetype: '',
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
          id: response.data._id,
          user: response.data,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
        })
        //alert(response.data._id)
        axios.get("http://localhost:3000/findpost").then(res=>{
        console.log(res)
        this.setState({post : res.data})


          })

      })
  }

 
  handledelete(id, index) {
    axios.delete("http://localhost:3000/deletepost/" + id).then((res) => {
      this.state.post.splice();
      window.location.reload();
    })
  }


  render() {
    //post design foreach loop
    const photoblog = this.state.post.map((post) => {
      return (
        <div className='row post'>
        <table id="customers">
                          
        <tr>
    <th>Venue Image</th>               
    <th>venue Name</th>
    <th>venue Type</th>
    <th>Phone</th>
    <th>Address </th>
    <th>Email</th>
    <th>Description</th>
  </tr>
              
  <tr >
  <img src={"http://localhost:3000/image/" + post.image} style = {{width : "80px" , marginLeft:"5px", height: "80px"}}/>
   <td>{post.venuename}</td>
    <td>{post.venuetype}</td>
    <td>{post.phone}</td>
    <td>{post.address}</td>
    <td>{post.email}</td>
     <td>{post.description}</td>
     
</tr>
                   </table>
                   
                   <div className="pull-right">
                   <button type="button" className="btn btn-primary" onClick={this.deletepost}  style={{ marginRight: 10, marginTop: 15 }} onClick= {()=> this.handledelete(post._id)}> <i className="fa fa-times" ></i> Delete </button>
                  </div>
                  </div>
      )
    })
    return (
      <div>

        <div className="content-wrapper" style={{ marginleft: "0 px" }}>


          <section id="candidates" className="content-header">
            <div className="container">
              <div className="row">
                <Navi />
                <div className="col-md-9 bg-white padding-2">
                  <form action="#" method="post" enctype="multipart/form-data" className="p-5 bg-white">
                    <div className="col-md-12">

                      <h3 className="mb-3 color-blue"><b>Venue Details</b></h3>
                      {photoblog}

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>



        </div>

      </div>

    )
  }
}
export default  VenueDetail