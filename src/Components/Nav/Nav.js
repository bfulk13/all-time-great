import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import Login from '../Login/Login'
import './Nav.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUser } from '../../redux/reducer'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }


    openModal = () => {
        this.setState({
            open: true
        })
    }

    closeModal = () => {
        this.setState({
            open: false
        })
    }

    logout = () => {
        axios.post(`/auth/logout`)
        this.props.clearUser()
    }
    handleIsLoggedIn(){
        if(this.props.reduxState.uid){
            this.props.history.push(`/profile/${this.props.reduxState.uid}`)
        }else{alert('please login')}
    }


    render() {
    
        const { open } = this.state
        return (
            <div className='nav-wrapper'>
                <nav>
                    <Link to={'/'}>
                        <img src={require('./images/goat.png')} alt='dabbing-goat' />
                    </Link>
                    <p className='logo'>G.O.A.T.</p>
                    <ul>
                        <div onClick={() =>this.handleIsLoggedIn()}>
                            <li><i className="far fa-user user-icon"></i></li>
                        </div>
                        <li><Link to={'/Search'} style={{ textDecoration: 'none' }}><i className="fas fa-search search-icon"></i></Link></li>
                        <li>
                            {this.props.reduxState.uid ?
                                <button onClick={this.logout} className='logout-nav'>Logout</button> :
                                <button onClick={this.openModal} className='login-nav'>Login</button>
                            }
                        </li>
                    </ul>
                </nav>
                <div className='login-modal'>
                    <Modal open={open} onClose={this.closeModal} center>
                        <Login
                            onClose={this.closeModal}
                        />
                    </Modal>
                </div>


            </div>
        )
    }
}

const mappedStateToProps = (reduxState) => {
    return {
        reduxState: reduxState.uid,
        reduxState
    }
}



export default withRouter(connect(mappedStateToProps, { clearUser })(Nav))