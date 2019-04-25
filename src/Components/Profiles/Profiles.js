import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import './Profiles.css'
class Profiles extends Component {
    constructor(props){
        super(props)

        this.state = {
            profiles: []
        }
    }


    componentDidMount() {
      this.getAllProfiles()
    }

    getAllProfiles = () => {
       axios.get('/api/allProfiles').then(res => {
           this.setState({
               profiles: res.data
           })
       })
    }





    render() {
        let mappedProfiles = this.state.profiles.map((profile, index)=> {
            return (
                <div key={index} className='profiles-wrapper'>
                   <Link to={`/profile/${profile.uid}`} style={{textDecoration:'none'}}>
                     <img src={profile.avatar} alt='profile image'/>
                       <div className='profiles-info'>
                         <p className='profiles-username'>{profile.username}</p>
                         <p className='profiles-email'>{profile.email}</p>
                       </div>
                  </Link>
                </div>
            )
        })
        return (
            <div className='profiles'>
            <h1>Profiles</h1>
            <div className='profiles-container'>
               {mappedProfiles}
               </div>
            </div>
        )
    }
}

export default Profiles