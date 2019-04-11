import React, {Component} from 'react';
import axios from 'axios';

class Profile extends Component{
  constructor(){
    super()
    this.state = {
      following: [],
      avatar: '',
      username: '',
      about: '',
      likedQs: 0
    }
  }

  componentDidMount(){
    this.viewProfile()
  }

  viewProfile = async (uid) => {
    let res = await axios.get(`/api/viewprofile/${this.props.match.params.uid}`)
    console.log(res.data)
    this.setState({
      avatar: res.data[0].avatar,
      username: res.data[0].username,
      about: res.data[0].about,
      likedQs: res.data[0].sum
    })
  }

  getFollowing = async () => {

  }

  render(){
    const {username, avatar, about, likedQs} = this.state
    return(
     <div className='Profile'> 
        <div >
          <h3>{username}</h3>
          <h3>{likedQs}</h3>
          <img src={avatar} alt="avatar"/>
          <p>{about}</p>
        </div>
        
      </div>
    )
  }
} 

export default Profile;