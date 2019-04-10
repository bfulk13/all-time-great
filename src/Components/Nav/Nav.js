import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import Login from '../Login/Login'
import './Nav.css'

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



    render() {
        const {open} = this.state
        return (
        <div className='nav-wrapper'>
          <nav>
              <img src='https://files.slack.com/files-pri/T039C2PUY-FHHBAQ5EV/goat.png' alt='dabbing-goat'/>
              <p className='logo'>G.O.A.T.</p>
              <ul>
                  <li><i onClick={this.openModal}className="far fa-user user-icon"></i></li>
                  <li><i className="fas fa-search search-icon"></i></li>
                  <li></li>
              </ul>
          </nav>
         <div className='login-modal'>
          <Modal open={open} onClose={this.closeModal}  center>
          <Login />
          </Modal>
          </div>
    
           
        </div>
        )
    }
}

export default Nav