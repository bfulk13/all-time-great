import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUser } from '../../redux/reducer'
import './Login.css'
import { Link } from 'react-router-dom'


class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            avatar: ''
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
        const { id } = this.props
        if (!id) {
            try {
                let res = await axios.get(`/api/current`)
                this.props.updateUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
    }

    checkUser = async () => {
        const { id } = this.props
        if (!id) {
            try {
                let res = await axios.get(`/api/current`)
                this.props.updateUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
    }

    login = async () => {
        const { username, password } = this.state
        try {
            let res = await axios.post(`/auth/login`, { username, password })
            this.props.updateUser(res.data)
        } catch (err) {
            console.log(err)
        }
    }



    register = async () => {
        try {
            const { username, password } = this.state
            if(username){
                const avatar = this.state.avatar ? this.state.avatar : `https://robohash.org/${username}`
                let res = await axios.post(`/auth/register`, { username, password, avatar })
                this.props.updateUser(res.data)
            } else {
                alert('Please enter a username and password.')
            } 
        } catch (err) {
            console.log(err)
        }
    }








    render() {
        return (

            this.props.reduxState.uid ? <div className='logout-wrapper'>
                <div>
                    <p>Get Voting, {this.props.reduxState.username}!</p>
                    <Link to={'/Questions'} style={{ textDecoration: 'none' }}>
                        <div>Start Voting Now!</div>
                    </Link>
                </div>

            </div> :
                <div className='login-wrapper'>
                    <input
                        className='username'
                        onChange={this.handleUsername}
                        value={this.state.username}
                        placeholder='Username' />
                    <input
                        className='password'
                        onChange={this.handlePassword}
                        value={this.state.password}
                        type='password'
                        placeholder='Password' />
                    <div className='btn-wrapper'>
                        <button className='login-btn' onClick={this.login}>Login</button>
                        <button className='register-btn' onClick={this.register}>Register</button>
                    </div>
                </div>
        )
    }

}

const mapStateToProps = (reduxState) => {
    return {
        uid: reduxState.uid,
        reduxState
    }
}

const mapDispatchStateToProps = {
    updateUser,
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Login)