import React, {Component} from 'react';
import axios from 'axios';

class Profile extends Component{
  constructor(){
    super()
    this.state = {
      following: [],
      avatar: '',
      username: '',
      likedQs: 0
    }
  }

  componentDidMount(){
    this.viewProfile()
  }

  viewProfile = async (uid) => {
    let res = await axios.get(`/api/viewprofile/${this.props.match.params.uid}`)
    // console.log(res.data)
    this.setState({
      avatar: res.data.avatar,
      username: res.data.username,
      likedQs: res.data.likes
    })
  }

  getFollowing = async () => {

  }

  render(){
    return(
     <div className='Profile'> 
        <div >
          Profile
        </div>
        
      </div>
    )
  }
} 

export default Profile;