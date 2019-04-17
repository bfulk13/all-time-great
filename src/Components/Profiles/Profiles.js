import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

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
        //    console.log(res)
           this.setState({
               profiles: res.data
           })
       })
    }





    render() {
        let mappedProfiles = this.state.profiles.map((profile, index)=> {
            return (
                <div key={index} className='Profiles-wrapper'style={{border: '1px solid black'}}>
                   <Link to={`/profile/${profile.uid}`}>
                     <img src={profile.avatar} alt='profile image' style={{width:'300px', height:'300px'}}/>
                     <p>{profile.username}</p>
                     <p>{profile.email}</p>
                  </Link>
                </div>
            )
        })
        return (
            <div className='profiles'>
               <p>Profiles Page</p>
               {mappedProfiles}
            </div>
        )
    }
}

export default Profiles