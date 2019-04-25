import React, { Component, useEffect } from 'react';
import './Result.css'
import { connect } from 'react-redux'
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2'
import Comments from '../Comments/Comments'
import { updateAnsArray, updateQuestion } from '../../redux/reducer'
import { arrayParser } from 'pg-types';

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
          { legend: { display: true, position: 'left' } },

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
          }
        ]
      },
      toNextVote: false,
      resultQid: 0,
      unanswered: []
    }
  }
  async componentDidMount() {
    await this.getResults()
    await this.buildChartData()
    await this.getUnansweredQs()
    this.setResultQid()
    this.updateChartyChart()
    console.log(22222, this.state.unanswered)
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

  updateChartyChart = async () => {
    let arrCopy = Object.assign([], this.state.data.datasets[0].data)
    let biggerArrCopy = Object.assign([], this.state.data)
    // console.log(9999, this.props)
    arrCopy[0] = this.props.answersArr[0].vote
    arrCopy[1] = this.props.answersArr[1].vote
    arrCopy[2] = this.props.answersArr[2] ? this.props.answersArr[2].vote : null
    arrCopy[3] = this.props.answersArr[3] ? this.props.answersArr[3].vote : null
    biggerArrCopy.datasets.data = arrCopy
    this.setState({
      data: biggerArrCopy
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
   await this.props.updateAnsArray(res.data)
    this.setState({
      ans1votes: this.state.answersArr[0].vote,
      ans2votes: this.state.answersArr[1].vote,
      ans3votes: this.state.answersArr[2] ? this.state.answersArr[2].vote : null,
      ans4votes: this.state.answersArr[3] ? this.state.answersArr[3].vote : null,
      ans1: this.state.answersArr[0].answer,
      ans2: this.state.answersArr[1].answer,
      ans3: this.state.answersArr[2] ? this.state.answersArr[2].answer : null,
      ans4: this.state.answersArr[3] ? this.state.answersArr[3].answer : null
    })
  }

  getUnansweredQs = async () => {
    let res = await axios.get(`/api/unansweredQuestions`);
    console.log(3434343, res.data)
    await this.setState({
      unanswered: res.data
    })
  }

  setResultQid = async () => {
    this.setState({
      resultQid: this.props.qid
    })
  }

  handleClick = async () => {
    await this.getUnansweredQs();
    if(this.state.unanswered.length > 0){
      await this.setState({
        toNextVote: true
      })    
      this.nextVote();
    } else {
      alert('There are no more questions to vote on at this time, go post some more!')
    }
  }

  nextVote = async () => {
    if (this.state.toNextVote === true) {
      let res = await axios.get(`/api/question/${this.state.unanswered[0].qid}`)
      let body = {
        qid: this.state.unanswered[0].qid,
        uid: this.props.uid
      }
      let resp = await axios.post('/api/getanswerresults', body)
      await this.setState({
        answersArr: resp.data,
        question: this.props.question
      })
      this.props.updateAnsArray(resp.data)
      let questionObj = {
        qid: this.state.unanswered[0].qid,
        question: res.data[0].question,
        q_img: res.data[0].q_img
      }
      this.props.updateQuestion(questionObj)
      this.props.history.push(`/Vote/${this.state.unanswered[0].qid}`)
    }
  }
      incrementLike = async () => {
      
          let body = { qid: this.props.qid, uid: this.props.uid }
          let canLike = await axios.post('/api/canLike', body)
          console.log('canvote', canLike)
          if (canLike.data === true) {
           axios.post('/api/incrementLike', body)
           alert('you like this question!!:)')
          
          } else if (canLike.data === false) {
           alert('you cant like it twice foo')
          }
        }
      
    render() {
      console.log(this.props)
      const winningansimg = this.props.answersArr[0] ? this.props.answersArr[0].ans_img : null
      const answers = this.props.answersArr.map(ans => {
        return (
          <div className='answers'>
            <img src={ans.ans_img} alt="" className='result-img' />
            <div className='paragraph'>
              <p>{ans.answer}</p>
              <p>{ans.vote}</p>
            </div>

          </div>
        )
      })
      return ( 

        <div className='Results'>
          <h1>{this.props.question}</h1>
            <div className='chart-js'>
              <img className='winning-img' src={winningansimg} alt="" />
              <Doughnut
                className='chart'
                data={this.state.data}
                width={250}
                height={250}
                options={{ legend: false, maintainAspectRatio:false }}
              />
            </div>
            <div className="nextVote">
              <i className="fas fa-chevron-right fa-5x" onClick={this.handleClick} style={{ display: "absolute", float: "right", marginRight: "10px", color:'white', opacity:'.3' }}></i>
            </div>
              <i className="fas fa-thumbs-up fa-5x" onClick={() => this.incrementLike()} style={{ display: "absolute", float: "left", marginLeft: "40px", color:'white' }}></i>
            <div className='answers-div'>
              {answers}
              <Comments />
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

  const mapDispatchToProps = {
    updateAnsArray,
    updateQuestion
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Results); 