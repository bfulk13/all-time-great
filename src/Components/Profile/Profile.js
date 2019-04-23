import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import './Profile.css'
class Profile extends Component{
  constructor(){
    super()
    this.state = {
      user: {},
      about: '',
      showAbout: true
    }
  }

  componentDidMount(){
    this.getProfile()
    console.log(this.props)
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

  updateAbout = () => {
    let body={about: this.state.about}
    let id = this.props.reduxState.uid
    axios.put(`/api/aboutMe/${id}`, body)
    this.toggleShowAbout()
  }

  toggleShowAbout = () => {
    this.setState({
      showAbout: !this.state.showAbout
    })
  }

  handleAbout = (e) => {
    this.setState({
      about: e.target.value
    })
  }


  render(){
    console.log(this.state)
    let username = this.state.user ? this.state.user.username : 'Wrong'
    const {user} = this.state
    return(
     <div className='Profile'> 
        <div className='user-info'>
          <h3 className='user-username'>{username}</h3>
          <h3 className='user-votes'>{user.sum}</h3>
          <img src={user.avatar} alt="avatar" className='user-avatar' />
          <p className='user-about'>{user.about}</p>
          {this.state.showAbout ? <div>
            <button onClick={this.toggleShowAbout} className='about-btn'>About Me</button>
          </div> : 
          <div className='my-modal'>
            <button className='close-x' onClick={this.toggleShowAbout}>X</button>
             <input
               value={this.state.about}
               onChange={this.handleAbout}/>
              <button className='update-btn' onClick={this.updateAbout}>Update</button>
          </div>
          }
        
        </div>
        
      </div>
    )
  }
} 

const mapStateToProps = (reduxState) => {
    return {
      reduxState
    }
}

export default connect(mapStateToProps, null)(Profile)