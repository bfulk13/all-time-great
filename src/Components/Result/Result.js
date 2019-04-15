import React, { Component } from 'react';
import './Result.css'
import { connect } from 'react-redux'
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2'
import { async } from 'q';

class Results extends Component {
  constructor() {
    super()
    this.state = {

      question: "",
      img: '',
      answersArr: [],
      ans1votes: 0,
      ans2votes: 0,
      ans3votes: 0,
      ans4votes: 0,
      ans1: '',
      ans2: '',
      ans3: '',
      ans4: '',
      data: {
        labels: ['', '', '', ''],
        datasets: [
          {
            label: 'Videos Made',
            backgroundColor: 'aqua',
            data: [1, 2, 3, 4]
          },
        
        ]
      }
    
    }
  }
  componentDidMount = async () => {
    await this.getResults()
    this.buildChartData()
  }
  
  buildChartData(){
    // let data = this.state.data
    // let innerData = data.datasets[0].data
    // innerData[0] = this.state.ans1votes
    // innerData[1] = this.state.ans2votes
    // innerData[2] = this.state.ans3votes
    // innerData[3] = this.state.ans4votes
    // console.log(data)
    // return data   
    let stateslice = Object.assign({}, this.state)
    stateslice.data.datasets[0].data[0] = this.state.ans4votes
    stateslice.data.datasets[0].data[1] = this.state.ans3votes
    stateslice.data.datasets[0].data[2] = this.state.ans2votes
    stateslice.data.datasets[0].data[3] = this.state.ans1votes
    stateslice.data.labels[0] = this.state.ans4
    stateslice.data.labels[1] = this.state.ans3
    stateslice.data.labels[2] = this.state.ans2
    stateslice.data.labels[3] = this.state.ans1
   
    this.setState({
      data: stateslice.data
    })  
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
    this.setState({
      ans1votes: this.state.answersArr[0].vote,
      ans2votes: this.state.answersArr[1].vote,
      ans3votes: this.state.answersArr[2].vote,
      ans4votes: this.state.answersArr[3].vote,
      ans1: this.state.answersArr[0].answer,
      ans2: this.state.answersArr[1].answer,
      ans3: this.state.answersArr[2].answer,
      ans4: this.state.answersArr[3].answer
     })
    // console.log(this.state.answersArr[0].ans_img)
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
            <Doughnut data={this.state.data}/>
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