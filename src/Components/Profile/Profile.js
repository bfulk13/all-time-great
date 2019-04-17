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
    let res = await axios.get(`/api/viewprofile/${this.props.match.params.owner_id}`)
    this.setState({
      user: res.data[0]
    })
  }

  getFollowing = async () => {

  }

  render(){
    const {user} = this.state
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