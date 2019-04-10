import React, { Component } from 'react';
import './Questions.css'
import { AssertionError } from 'assert';
import Axios from 'axios';
import {Link} from 'react-router-dom'

class Questions extends Component {
  constructor() {
    super()
    this.state = {
      trendingQuestionsArr: [ ],
      question: '',
      q_img: ''

    }
  }
  componentDidMount(){
    this.getAllQuestions()
  }

   getAllQuestions = async () => {
     let res = await Axios.get('/api/getallquestions')
     console.log(22222222, res)
   this.setState({
     trendingQuestionsArr: res.data
   })
   console.log(this.state.trendingQuestionsArr,333333333)
  }

  createNewQuestion = async () => {
    // add in IF redundancy if q or qimg is blank
    const {owner_id} = this.props
    const {question, q_img} = this.state
    let body = {question: question, q_img: q_img, owner_id: owner_id}
    let res = await Axios.post('/api/addnewquestion', body)
  }

  render() {
    console.log(111, this.state)
    const trendingQuestions = this.state.trendingQuestionsArr.map(obj => {
      return (
         <div className='SingleQuestionDiv'>
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
            <div className="PlusSignDiv">
              <img className="PlusSign" src="http://pngimg.com/uploads/plus/plus_PNG122.png" alt="plus sign" />
            </div>
            <p>Add a new Question</p>
          </div>

        </div>
        <div className=''>

        </div>
      </div>
    )
  }
}

export default Questions;