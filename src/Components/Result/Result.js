import React, { Component } from 'react';
import './Result.css'
import { connect } from 'react-redux'
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2'

class Results extends Component {
  constructor() {
    super()
    this.state = {

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
        options: [
          {legend: {display: true, position: 'left'}},  

        ],
        datasets: [
          {
            label: 'Videos Made',
            backgroundColor: ['#f4425c', '#2e6ba0', '#258c61', '#f9d61d'],
            borderColor: '#000',
            borderWidth: .5,
            hoverBackgroundColor: ['#ff6d83', '#65aeed', '#2fb77e', '#ffe566'],
            hoverBorderColor: '#444444',
            data: [1, 2, 3, 4]
          },

        ]
      }

    }
  }
  componentDidMount = async () => {
    await this.getResults()
    // this.buildChartData()
    console.log(1234, this.props)
  }

  buildChartData() {
    // let data = this.state.data
    // let innerData = data.datasets[0].data
    // innerData[0] = this.state.ans1votes
    // innerData[1] = this.state.ans2votes
    // innerData[2] = this.state.ans3votes
    // innerData[3] = this.state.ans4votes
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
      ans1votes: this.props.answersArr[0].vote,
      ans2votes: this.props.answersArr[1].vote,
      ans3votes: this.props.answersArr[2] ? this.props.answersArr[2].vote: null ,
      ans4votes: this.props.answersArr[3] ? this.props.answersArr[3].vote: null,
      ans1: this.props.answersArr[0].answer,
      ans2: this.props.answersArr[1].answer,
      ans3: this.props.answersArr[2] ? this.props.answersArr[2].answer : null,
      ans4: this.props.answersArr[3] ? this.props.answersArr[3].answer : null
     })
  }



  render() {
    const winningansimg = this.props.answersArr[0] ? this.props.answersArr[0].ans_img : null
    const answers = this.props.answersArr.map(ans => {
    
      return (
        <div className='Answers'>
          <img src={ans.ans_img} alt="" className='ResultImg' />
          <div className='paragraph'>
            <p>{ans.vote}</p>
            <p>{ans.answer}</p>
          </div>
        </div>
      )
    })
    return (

      <div className='Results'>
        <h1>{this.props.question}</h1>
        <div className='TopHalfDiv'>
          <div className='ChartJsStuff'>
            <img className='QuestionImage' src={winningansimg} alt="" />
            <Doughnut
              className='Chart'
              data={this.state.data}
              options={{ legend: false }}
            />
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
    q_img: reduxState.q_img,
    question: reduxState.question,
    answersArr: reduxState.ansArr
  }
}

export default connect(mapStateToProps)(Results); 