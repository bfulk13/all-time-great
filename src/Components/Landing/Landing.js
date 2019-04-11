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
        <div className='SingleTrendingQuestionDiv' key={obj.qid}>
        <Link to={`/Vote/${obj.qid}`}><div className='SingleTrendingQuestionDiv'>
          <h4>{obj.question}</h4>
          <img src={obj.q_img} alt="" className="QuestionImg"/>
        </div>
        </Link>
          </div>
      )
    })
    const popularProfiles = this.state.popularProfilesArr.map( obj => {
      return(
        <Link to={`/Profile/${obj.uid}`}>
          <div>
            <div key={obj.uid}>
              <img src={obj.avatar} alt="" className='ProfilePic'/>
              <h5>{obj.username}</h5>
            </div>
          </div>
        </Link>  
      )
    })
    return(
     <div className='Landing'> 
          <Link to="/Questions"><h1>Trending Questions</h1></Link>
        <div className='TrendingDiv'>
          {trendingQuestions}
        </div>
        <div className='PopularProfilesDiv'>
          <h1 style={{marginTop: '0'}}>Popular Profiles</h1>
          {popularProfiles}
        </div>
      </div>
    )
  }
} 
export default Landing;