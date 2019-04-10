import React, { Component } from 'react';
import './Vote.css'
import {Link} from 'react-router-dom'
import Axios from 'axios'

class Vote extends Component {
  constructor() {
    super()
    this.state = {
      
          question: "What kind of bear is best?",
          img: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg',
          answers: [
            // {
            //   answer: 'Black Bear',
            //   AID: 111111,
            //   img: 'https://upload.wikimedia.org/wikipedia/commons/0/08/01_Schwarzb%C3%A4r.jpg'
            // },
            // {
            //   answer: 'Beats',
            //   AID: 112222,
            //   img: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw37c307da/images/products/vegetables/0125_01_redace.jpg?sw=774&cx=302&cy=0&cw=1196&ch=1196'
            // },
            // {
            //   answer: 'Battlestar Galactica',
            //   AID: 11333,
            //   img: 'https://upload.wikimedia.org/wikipedia/en/4/40/Battlestar_Galactica_intro.jpg'
            // },           
          ],
          anwser: ''

        
        
    }
  }
  componentDidMount(){
    this.getQuestionAndAnswers()
   
  }
  getQuestionAndAnswers = async () => {
    let res = await Axios.get(`/api/getanswersforquestion/${this.props.match.params.qid}`)
  }

  Vote = async () => {
    let aid = this.state.aid
    let qid = this.props.match.params.qid
    let uid = this.props.uid
    let body = {aid, qid, uid}
    let res = await Axios.post('/api/sendselectedanswer', body)
  }
  updateAnswer= (val) => {
    this.setState({
      answer: val
    })
  }

  render() {
    const answers = this.state.answers.map(ans => {
      return (
        <div className='SingleAnswerDiv' onClick={ () => this.updateAnswer(ans.id)}>
          <h4>{ans.answer}</h4>
          <img src={ans.img} alt="" className="AnswerImg" />
        </div>
      )
    })

    return (
      <div className='Vote'>
        <h1>Cast Your Vote</h1>
        <div className='VotingDiv'>
          <h2>{this.state.question}</h2>
          {answers}
          <div>
           <Link to='/Result'><button onClick={() => this.Vote() }>Submit Vote</button></Link>
          </div>

        </div>
        <div className=''>

        </div>
      </div>
    )
  }
}

export default Vote;