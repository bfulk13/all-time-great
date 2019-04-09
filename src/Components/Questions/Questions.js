import React, { Component } from 'react';
import './Questions.css'

class Questions extends Component {
  constructor() {
    super()
    this.state = {
      trendingQuestionsArr: [
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
        {
          question: "What kind of bear is best?",
          img: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg'
        },
      ],

    }
  }

  render() {
    const trendingQuestions = this.state.trendingQuestionsArr.map(obj => {
      return (
        <div className='SingleQuestionDiv'>
          <h4>{obj.question}</h4>
          <img src={obj.img} alt="" className="QuestionImg" />
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