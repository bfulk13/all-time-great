import React, {Component} from 'react';
import './Landing.css'
import {Link} from 'react-router-dom'

class Landing extends Component{
  constructor(){
    super()
    this.state = {
      trendingQuestionsArr: [
        {
        question: "What kind of bear is best?",
        img: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg',
       },
        {
        question: "What kind of bear is best?",
        img: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg'
       },
        {
        question: "What kind of bear is best?",
        img: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg'
       },
        {
        question: "What kind of bear is best?",
        img: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg'
       },
      ],
      popularProfilesArr: [
        {
          name: 'Senator Palpatine',
          img: 'https://media.moddb.com/cache/images/groups/1/5/4680/thumb_620x2000/Insidious_Smile.jpg'
        },
        {
          name: 'Ron Burgandy',
          img: 'https://thenypost.files.wordpress.com/2018/12/will-ferrell-ron-burgundy.jpg?quality=90&strip=all&w=1236&h=820&crop=1'
        },
        {
          name: 'Ron Swanson',
          img: 'https://static.parade.com/wp-content/uploads/2013/10/tv-show-best-boss-ron-swanson.jpg'
        },
        {
          name: 'Severus Snape',
          img: 'https://vignette.wikia.nocookie.net/harrypotter/images/a/a3/Severus_Snape.jpg/revision/latest?cb=20150307193047'
        },
      ]
    }
  }
  render(){
    const trendingQuestions = this.state.trendingQuestionsArr.map( obj => {
      return(
        <div className='SingleTrendingQuestionDiv'>
        <Link to={`/Vote/${obj.qid}`}><div className='SingleTrendingQuestionDiv'>
          <h4>{obj.question}</h4>
          <img src={obj.img} alt="" className="QuestionImg"/>
        </div>
        </Link>
          </div>
      )
    })
    const popularProfiles = this.state.popularProfilesArr.map( obj => {
      return(
        <div>
        <Link to="/Profile"><div>
          <img src={obj.img} alt=""className='ProfilePic'/>
          <h5>{obj.name}</h5>
        </div>
        </Link>  
          </div>
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