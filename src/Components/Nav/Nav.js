import React, {Component} from 'react'
import Modal from 'react-responsive-modal';

class Nav extends Component {
     constructor(props) {
         super(props)

         this.state = {
             open: false
         }
     }





    render() {
        return (
        <div className='nav-wrapper'>
          <nav>
              <img src='https://files.slack.com/files-pri/T039C2PUY-FHHBAQ5EV/goat.png' alt='dabbing-goat'/>
              <ul>
                  <li><i class="far fa-user"></i></li>
                  <li><button>Login</button></li>
                  <li></li>
              </ul>
          </nav>
           
        </div>
        )
    }
}

export default Nav