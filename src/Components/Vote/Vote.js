import React, { Component } from 'react'
import './Vote.css'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {connect} from 'react-redux'
import {updateQuestion} from '../../redux/reducer'

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
  componentDidMount(){
    this.getQuestionAndAnswers()
    console.log(this.props)
    console.log(this.state)
    
  }
  getQuestionAndAnswers = async () => {
    let quest = await Axios.get(`/api/question/${this.props.match.params.id}`)
    let res = await Axios.get(`/api/getanswersforquestion/${this.props.match.params.id}`)
    console.log('quest', quest)
    console.log('res', res)
    this.setState({
      question: quest.data[0].question,
      answers: res.data,
      qid: quest.data[0].q_id
    })
  }
  
  Vote = async () => {
    let qid = this.state.qid
    let uid = this.props.uid
    let body = {qid: qid, uid: uid}
    await Axios.post('/api/sendselectedanswer', body)
  }
  updateQid= async (val) => {
    console.log(11111111, val)
    await this.setState({
      qid: val,
    })
    console.log(2222222, this.state.qid)
    // this.props.updateQuestion(this.state.qid)
    this.props.updateQuestion({qid: this.state.qid})  
  }

  render() {
    const answers = this.state.answers.map(ans => {
      console.log({ans})
      return (
        <div className='SingleAnswerDiv' onClick={ () => this.updateQid(ans.q_id)} key={ans.aid}>
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
   uid: reduxState.id,
   qid: reduxState.qid
  }
}

const mapDispatchToProps = {
  updateQuestion
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)