import React, { Component } from 'react';
import './Vote.css'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {connect} from 'react-redux'

class Vote extends Component {
  constructor() {
    super()
    this.state = {
      
          question: {},
          img: '',
          answers: [],
          anwser: ''

        
        
    }
  }
  componentDidMount(){
    this.getQuestionAndAnswers()
   
  }
  getQuestionAndAnswers = async () => {
    let quest = await Axios.get(`/api/question/${this.props.match.params.id}`)
   console.log(quest)
    let res = await Axios.get(`/api/getanswersforquestion/${this.props.match.params.id}`)
    this.setState({
      question: quest.data[0],
      answers: res.data
    })
    console.log(this.state.answers)
  }

  Vote = async () => {
    let aid = this.state.answer
    let qid = this.state.question.qid
    let uid = this.props.uid
    let body = {aid, qid, uid}
    await Axios.post('/api/sendselectedanswer', body)
  }
  updateAnswer= (val) => {
    this.setState({
      answer: val
    })
    console.log(this.state.answer)
  }

  render() {
    const answers = this.state.answers.map(ans => {
      return (
        <div className='SingleAnswerDiv' onClick={ () => this.updateAnswer(ans.aid)} key={ans.aid}>
          <h4>{ans.answer}</h4>
          <img src={ans.ans_img} alt="" className="AnswerImg" />
        </div>
      )
    })

    return (
      <div className='Vote'>
        <h1>Cast Your Vote</h1>
        <div className='VotingDiv'>
        <img src={this.state.question.q_img} alt="question pic"/>
          <h2>{this.state.question.question}</h2>
          {answers}
          <div>
           <Link to='/Result'><button onClick={() => this.Vote(this.state.anwser) }>Submit Vote</button></Link>
          </div>

        </div>
        <div className=''>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return{
   uid: reduxState.id
  }
}

export default (connect(mapStateToProps)(Vote))