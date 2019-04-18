import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

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
      about: e
    })
  }


  render(){
    // console.log(this.state)
    const {user} = this.state
    return(
     <div className='Profile'> 
        <div >
          <h3>{user.username}</h3>
          <h3>{user.sum}</h3>
          <img src={user.avatar} alt="avatar" style={{width:'300px', width:'300px'}} />
          <p>{user.about}</p>
          {this.state.showAbout ? <div>
            <button onClick={this.toggleShowAbout} style={{border:'1px solid black'}}>About Me</button>
          </div> : 
          <div>
             <input
               value={this.state.about}
               onChange={(e)=>this.handleAbout(e.target.value)}/>
              <button onClick={this.updateAbout} style={{border:'1px solid black'}}>Update</button>
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