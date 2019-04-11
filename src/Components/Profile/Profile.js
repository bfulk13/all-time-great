import React, {Component} from 'react';
import axios from 'axios';

class Profile extends Component{
  constructor(){
    super()
    this.state = {
      user: {}
    }
  }

  componentDidMount(){
    this.viewProfile()
  }

  viewProfile = async () => {
    // console.log(this.props.match.params)
    let res = await axios.get(`/api/viewprofile/${this.props.match.params.owner_id}`)
    // console.log(res)
    this.setState({
      user: res.data[0]
    })
  }

  getFollowing = async () => {

  }

  render(){
    const {user} = this.state
    // console.log(user)
    return(
     <div className='Profile'> 
        <div >
          <h3>{user.username}</h3>
          <h3>{user.sum}</h3>
          <img src={user.avatar} alt="avatar"/>
          <p>{user.about}</p>
        </div>
        
      </div>
    )
  }
} 

export default Profile;