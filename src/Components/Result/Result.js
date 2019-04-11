import React, { Component } from 'react';
import './Result.css'
import { connect } from 'react-redux'
import axios from 'axios';

class Results extends Component {
  constructor() {
    super()
    this.state = {

      question: "",
      img: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg',
      answersArr: []
    }
  }
  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    let body = {
      qid: this.props.qid,
      uid: this.props.uid
    }
    let res = await axios.post('/api/getanswerresults', body)
    
    await this.setState({
      answersArr: res.data,
      question: this.props.question
    })
    console.log(this.state.answersArr[0].ans_img)
  }

  render() {
    const winningansimg = this.state.answersArr[0] ? this.state.answersArr[0].ans_img : null
    const answers = this.state.answersArr.map(ans => {
    
      return (
        <div>
          <span>{ans.answer} {ans.vote}</span>
          <img src={ans.ans_img} alt="" className='ResultImg'/>
        </div>
      )
    })
    return (

      <div className='Results'>
        <h1>{this.props.question}</h1>
        <div className='TopHalfDiv'>
          <div className='ChartJsStuff'>
            <img className='QuestionImg' src={winningansimg} alt="" />
          </div>
          <div className='AnswersDiv'>
          {answers}
          </div>



        </div>

        <div className='ResponsesDiv'>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    qid: reduxState.qid,
    uid: reduxState.uid,
    question: reduxState.question
  }
}

export default connect(mapStateToProps)(Results); 