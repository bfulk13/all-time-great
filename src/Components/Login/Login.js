import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser, clearUser} from '../../redux/reducer'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }

    handleUsername = (e) => {
       this.setState({
           username: e.target.value
       })
    }

    handlePassword = (e) => {
       this.setState({
           password: e.target.value
       })
    }
    
    componentDidMount() {
       this.getUser();
       this.checkUser();
    }

    getUser = async () => {
        const {id} = this.props
        if(!id) {
         try {
             let res = await axios.get(`/api/current`)
             this.props.updateUser(res.data)
         } catch(err) {
             console.log('Error getting user ID')
         }
     }
    }

    checkUser = async () => {
        const {id} = this.props
        if(!id) {
            try {
                let res = await axios.get(`/api/current`)
                this.props.updateUser(res.data)
            } catch(err) {
                console.log(err)
            }
        }
    }
    
    login = async () => {
       const {username, password} = this.state
       try {
           let res = await axios.post(`/auth/login`, {username, password})
           this.props.updateUser(res.data)
       } catch(err) {
           console.log(err)
       }
    }

    logout = () => {
       axios.post(`/auth/logout`)
       this.props.clearUser()
    }

    register = async () => {
       try {
           const {username, password, img} = this.state
           let res = await axios.post(`/auth/register`, {username, password, img})
           this.props.updateUser(res.data)
       } catch(err) {
           console.log(err)
       }
    }

   

   




  render() {
      return (
          <div className='login-wrapper'>
           <input 
             className='username' 
             onChange={this.handleUsername}
             value={this.state.username}/>
           <input 
             className='password' 
             onChange={this.handlePassword}
             value={this.state.password}
             type='password'/>
           <button className='login-btn' onClick={this.login}>Login</button>
           <button className='register-btn' onClick={this.register}>Register</button>
          </div>
      )
  }

}

const mapStateToProps = (reduxState) => {
    return {
        id: reduxState.id,
        reduxState
    }
}

const mapDispatchStateToProps = {
    updateUser,
    clearUser
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Login)