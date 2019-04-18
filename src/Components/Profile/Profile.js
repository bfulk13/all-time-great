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
    this.getProfile()
  }

  getProfile = async () => {
    let res = await axios.get(`/api/profile/${this.props.match.params.uid}`)
    console.log(res.data)
    this.setState({
      user: res.data[0]
    })
  }

  getFollowing = async () => {

  }

  render(){
    // console.log(this.state)
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