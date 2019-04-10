import React, { Component } from 'react';
import './Result.css'
import {connect} from 'react-redux'
import axios from 'axios';

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
  this.getResults()
 } 

 getResults = async () => {
  let body = {
    qid: this.props.qid,
    uid: this.props.uid
  }
  let res = await axios.post('/api/getanswerresults', body)

 }

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

const mapStateToProps = (reduxState) => {
  return{
    qid: reduxState.qid,
    uid: reduxState.uid
  }
} 

export default connect(mapStateToProps)(Results); 