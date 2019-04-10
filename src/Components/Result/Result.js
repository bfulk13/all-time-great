import React, { Component } from 'react';
import './Result.css'

class Results extends Component {
  constructor() {
    super()
    this.state = {

          question: "What kind of bear is best?",
          img: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg',
          answer: 'none of them'
    }
  }
 componentDidMount(){

 }
 get 

  render() {




    return (
      <div className='Results'>
        <h1>{this.state.question}</h1>
        <div className='TopHalfDiv'>
          <div className='ChartJsStuff'>
            <img className='QuestionImg' src={this.state.img} alt=""/>
          </div>
          <div className='AnswersDiv'>

          </div>



          </div>

        <div className='ResponsesDiv'>

        </div>
      </div>
    )
  }
}

export default Results; 