import React, { Component } from 'react';
import './Landing.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux'
import {updateQuestion, updateAnsArray} from '../../redux/reducer'


class Landing extends Component {
  constructor() {
    super()
    this.state = {
      trendingQuestionsArr: [],
      popularProfilesArr: []
    }
  }
  componentDidMount() {
    this.getTrendingQuestions()
    this.getPopularProfiles()
    console.log(234, this.props)
  }
  getTrendingQuestions = () => {
    axios.get('/api/questions').then(res => {
      this.setState({
        trendingQuestionsArr: res.data
      })
    })
  }
  getPopularProfiles = () => {
    axios.get('/api/profiles').then(res => {
      this.setState({
        popularProfilesArr: res.data
      })
    })
  }
  CheckVotedOrNot = async (obj) => {
    await this.props.updateQuestion(obj)
    console.log(333, obj)
    let body = { qid: obj.qid, uid: this.props.reduxState.uid }
    let canVote = await axios.post('/api/ifVoted', body)
    console.log('canvote', canVote)
    if (canVote.data === true) {
      let quest = await axios.get(`/api/question/${obj.qid}`)
      let res = await axios.get(`/api/getanswersforquestion/${obj.qid}`)
      this.props.updateAnsArray(res.data)
      this.setState({
        question: quest.data[0],
        answers: res.data,
      })
      this.props.history.push(`/Vote/${this.props.reduxState.qid}`)
    } else if (canVote.data === false) {
      this.setState({
        question: this.props.question,
        answers: this.props.answers,
        qid: this.props.qid
      })
      this.props.history.push('/Result')
    }
  }
  render() {
    const trendingQuestions = this.state.trendingQuestionsArr.map(obj => {
      return (
          <div key={obj.qid} className='question' onClick={() => this.CheckVotedOrNot(obj)}>
            <img src={obj.q_img} alt="" />
            <p>{obj.question}</p>
          </div>
      
      )
    })
    const popularProfiles = this.state.popularProfilesArr.map(obj => {
      return (
        <div key={obj.owner_id} className='pop-profile-wrapper'>
          <Link to={`/viewprofile/${obj.owner_id}`} style={{ textDecoration: 'none' }}>
            <img src={obj.avatar} alt="" className='profile-pic' />
            <p>{obj.username}</p>
          </Link>
        </div>
      )
    })
    return (
      <div className='Landing'>
        <div className='landing-intro'>
          <div className='thought-wrapper'>
            <img src={require('./images/thought.png')} alt='thought bubble' className='thought-bubble' />
            <p>Goat?</p>
          </div>
          <img src={require('./images/landingGoat.png')} alt='curious goat' className='goat-image' />
        </div>
        <Link to="/Questions" style={{ textDecoration: 'none' }}><p className='landing-title'>Trending Questions ?</p></Link>
        <div className='questions-wrapper'>
          {trendingQuestions}
        </div>
        <div className='pop-profiles-wrapper'>
          <Link to="/Profiles" style={{ textDecoration: 'none' }}><p className='landing-title'>Popular Profiles</p></Link>
          {popularProfiles}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}
const mapDispatchToProps = {
  updateQuestion,
  updateAnsArray
 
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
