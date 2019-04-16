import React, { Component } from 'react'
import './Vote.css'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {connect} from 'react-redux'
import {updateQuestion, updateAnsArray} from '../../redux/reducer'

class Vote extends Component {
  constructor() {
    super()
    this.state = {
      
      question: {},
      img: '',
      answers: [],
      anwser: '',
      aid: 0,
      qid: 0
    }
  }
  componentDidMount = async () => {
    await this.getQuestionAndAnswers()
    this.props.updateQuestion(this.state.question)
  }
  getQuestionAndAnswers = async () => {
    let quest = await Axios.get(`/api/question/${this.props.match.params.id}`)
    let res = await Axios.get(`/api/getanswersforquestion/${this.props.match.params.id}`)
    this.props.updateAnsArray(res.data)
    console.log(1234, this.props)
    this.setState({
      question: quest.data[0],
      answers: res.data,
      qid: quest.data[0].qid
    })
    console.log(22222, this.state)
  }
  
  Vote = async () => {
    let qid = this.state.qid
    let aid = this.state.aid
    let uid = this.props.uid
    let body = {qid, uid, aid}
    await Axios.post('/api/sendselectedanswer', body)
  }
  updateQidAid= async (val, val2) => {
    await this.setState({
      qid: val,
      aid: val2
    })
    this.props.updateQuestion({qid: this.state.qid, question: this.state.question.question})  
  }

  render() {
    const answers = this.props.ansArr.map(ans => {
      return (
        <div className='SingleAnswerDiv' onClick={ () => this.updateQidAid(ans.q_id, ans.aid)} key={ans.aid}>
          <h4>{ans.answer}</h4>
          <img src={ans.ans_img} alt="" className="AnswerImg" />
        </div>
      )
    })

    return (
      <div className='Vote'>
        <h1>Cast Your Vote</h1>
        <div className='VotingDiv'>
        <img src={this.props.q_img} alt="question pic"/>
          <h2>{this.props.question}</h2>
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
   uid: reduxState.uid,
   qid: reduxState.qid,
   q_img: reduxState.q_img,
   question: reduxState.question,
   ansArr: reduxState.ansArr
  }
}

const mapDispatchToProps = {
  updateQuestion,
  updateAnsArray
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)