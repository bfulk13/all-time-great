import React, { Component } from 'react';
import './Questions.css'
import Axios from 'axios';
import {Link} from 'react-router-dom'
import Modal from 'react-responsive-modal'

class Questions extends Component {
  constructor() {
    super()
    this.state = {
      trendingQuestionsArr: [],
      question: '',
      q_img: '',
      open: false,
      answers: [
        {
          answerName: 'answer1',
          text: '',
          ans_img: ''
        },
        {
          answerName: 'answer2',
          text: '',
          ans_img: ''
        }
      ]
    }
  }
  onOpenModal = () => {
    this.setState({
      open: true
    })
  }

  onCloseModal = () => {
    this.setState({
      open: false
    })
  }

  componentDidMount(){
    this.getAllQuestions()
  }

   getAllQuestions = async () => {
     let res = await Axios.get('/api/getallquestions')
   this.setState({
     trendingQuestionsArr: res.data
   })
  }

  updateAnswer = (val, str) => {
    // const {answerName} = this.state.answer
    let foundIndex = this.state.answers.findIndex((answer) => {
      return answer.answerName === str
    })
    const newAnswers = this.state.answers.slice()
    newAnswers[foundIndex].text = val
    this.setState(prevState => ({
      answers: newAnswers
    }))
    console.log(val, str)
  }

  updateQuestion = (val) => {
    this.setState({
      question: val
    })
  }

  createNewQuestion = async () => {
    // add in IF redundancy if q or qimg is blank
    const {owner_id} = this.props
    const {question, q_img, answers} = this.state
    let body = {question, q_img, owner_id, answers}
    let res = await Axios.post('/api/addnewquestion', body)
  }

  buildAnswersJSX = () => {
    if(this.state.answers.length < 4){
    const newAnswer= {
      answerName: `answer${this.state.answers.length + 1}`,
      text: ''
    }
    this.setState(prevState => ({
        answers: [...prevState.answers, newAnswer]
    }))
  } else {
    alert('Only four answers please!')
  }
  }

  render() {
    const inputBoxes = this.state.answers.map((answer) => {
      return(
        <input type="text" placeholder={answer.answerName} onChange={(e) => this.updateAnswer(e.target.value, answer.answerName)}/>
      )
    })
    const { open } = this.state
    const trendingQuestions = this.state.trendingQuestionsArr.map(obj => {
      return (
         <div className='SingleQuestionDiv' key={obj.qid}>
         {/* Need to have redux update the question id on click so the render on /vote can pull the right question */}
          <Link to={`/Vote/${obj.qid}`} id={obj.id}><h4>{obj.question}</h4></Link> 
          <img src={obj.q_img} alt="" className="QuestionImg" />
        </div>
      )
    })

    return (
      <div className='Questions'>
        <h1>Trending Questions</h1>
        <div className='QuestionsDiv'>
          {trendingQuestions}
          <div>
            <div className="PlusSignDiv" onClick={this.onOpenModal} >
              <img className="PlusSign" src="http://pngimg.com/uploads/plus/plus_PNG122.png" alt="plus sign" />
            </div>
            <p>Add a new Question</p>
          </div>

        </div>
            <Modal open={open} onClose={this.onCloseModal} center >
            <div style={{width: "80vw", height: "80vh"}}>
              <h2>I AM MODAL MAN</h2>
              <input placeholder="Question" type="text" onChange={(e) => {this.updateQuestion(e.target.value)}} />
              {inputBoxes}
              <button onClick={this.buildAnswersJSX}>I am an add button</button>
            </div>
            </Modal>
        <div className=''>

        </div>
      </div>
    )
  }
}

export default Questions;