import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateQuestion, updateAnsArray} from '../../redux/reducer'
import './Search.css'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      searchbar: '',
      questions: []
    }
  }
  searchForStuff = async () => {
    if(!this.props.uid){
      alert('Please login or register first')
    } else {
      let body = {
        string: this.state.searchbar
      }
      let res = await axios.post('/api/searchforquestions', body)
      this.setState({
        questions: res.data
      })
    }
  }

  updateSearchBar(val){
    this.setState({
      searchbar: val
    })
  }
  CheckVotedOrNot = async (obj) => {
    // console.log(obj)
    await this.props.updateQuestion(obj)
    let body = { qid: obj.qid, uid: this.props.uid }
    let canVote = await axios.post('/api/ifVoted', body)
    // console.log(canVote)
    if (canVote.data === true) {
      let quest = await axios.get(`/api/question/${obj.qid}`)
      let res = await axios.get(`/api/getanswersforquestion/${obj.qid}`)
      this.props.updateAnsArray(res.data)
      this.setState({
        question: quest.data[0],
        answers: res.data,
      })
      this.props.history.push(`/Vote/${this.props.qid}`)
    } else if (canVote.data === false) {
      this.setState({
        question: this.props.question,
        answers: this.props.answers,
        qid: this.props.qid
      })
      this.props.history.push('/Result')
    }
  }

  render() {
    const questions = this.state.questions ? this.state.questions.map( question => {
      return(
        <div className='BoxyBox' onClick={() => this.CheckVotedOrNot(question)}>
          <img src={question.q_img} alt="" className='SearchResultImage'/>
          <p>{question.question}</p>
        </div>
      )
    }) : <div>'no results :('</div>

    return (
      <div className='Search'>
        <form action="">
            <input className="SearchInput" type="text" placeholder="Search A Question" onChange={(e) => this.updateSearchBar(e.target.value)}/></form>
            <button className="SearchButton" onClick={() => this.searchForStuff(this.state.searchbar)}>Search</button>
        <div className='SearchMainDiv'>

            <div>
              {questions}
            </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return{
   uid: reduxState.uid,
   qid: reduxState.qid,
   q_img: reduxState.q_img,
   question: reduxState.question,
   ansArr: reduxState.ansArr
  }
}

const mapDispatchToProps = {
  updateQuestion,
  updateAnsArray
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)