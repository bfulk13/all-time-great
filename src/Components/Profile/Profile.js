import React, {Component} from 'react';

class Profile extends Component{
  constructor(){
    super()
    this.state = {
      trendingQuestionsObj: {},
      popularProfilesObj: {}
    }
  }

  render(){
    return(
     <div className='Profile'> 
        <div >
          Profile
        </div>
        
      </div>
    )
  }
} 

export default Profile;