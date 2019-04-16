import React, {Component} from 'react';
import './Landing.css'
import {Link} from 'react-router-dom'
import Axios from 'axios';


class Landing extends Component{
  constructor(){
    super()
    this.state = {
      trendingQuestionsArr: [],
      popularProfilesArr: []
    }
  }
  componentDidMount(){
    this.getTrendingQuestions()
    this.getPopularProfiles()
  }
  getTrendingQuestions = async () => {
    let res = await Axios.get('/api/questions')
    this.setState({
      trendingQuestionsArr: res.data
    })
  }
  getPopularProfiles = async () => {
    let res = await Axios.get('/api/profiles')
    this.setState({
     popularProfilesArr: res.data
    })
  }
  render(){
    const trendingQuestions = this.state.trendingQuestionsArr.map( obj => {
      return(
        <Link to={`/Vote/${obj.qid}`} style={{textDecoration:'none'}}>
        <div key={obj.qid} className='question'>
          <img src={obj.q_img} alt=""/>
          <p>{obj.question}</p>
          </div>
        </Link>
      )
    })
    const popularProfiles = this.state.popularProfilesArr.map( obj => {
      // console.log(obj)
      return(
            <div key={obj.owner_id} className='pop-profile-wrapper'>
        <Link to={`/viewprofile/${obj.owner_id}`} style={{textDecoration:'none'}}>
              <img src={obj.avatar} alt="" className='profile-pic'/>
              <p>{obj.username}</p>
        </Link>  
            </div>
      )
    })
    return(
     <div className='Landing'> 
          <div className='landing-intro'>
            <div className='thought-wrapper'>
            <img src={require('./images/thought.png')} alt='thought bubble'className='thought-bubble'/>
            <p>Goat?</p>
            </div>
            <img src={require('./images/landingGoat.png')} alt='curious goat' className='goat-image'/>
          </div>
          <Link to="/Questions" style={{textDecoration:'none'}}><p className='landing-title'>Trending Questions ?</p></Link>
        <div className='questions-wrapper'>
          {trendingQuestions}
        </div>
        <div className='pop-profiles-wrapper'>
          <p className='landing-title'>Popular Profiles</p>
          {popularProfiles}
        </div>
      </div>
    )
  }
} 

//hope this works
export default Landing;