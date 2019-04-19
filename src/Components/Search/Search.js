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
    let body = {
      string: this.state.searchbar
    }
    let res = await axios.post('/api/searchforquestions', body)
    this.setState({
      questions: res.data
    })
  }

  updateSearchBar(val){
    this.setState({
      searchbar: val
    })
  }

  render() {
    const questions = this.state.questions ? this.state.questions.map( question => {
      return(
        <div className='BoxyBox'>
          {question.question}
          <img src={question.q_img} alt="" className='SearchResultImage'/>
        </div>
      ) 
    }) : <div>'no results :('</div>

    return (
      <div className='Search'>
        <form action="">
            <input type="text" placeholder="Search A Question" onChange={(e) => this.updateSearchBar(e.target.value)}/></form>
            <button onClick={() => this.searchForStuff(this.state.searchbar)}>Search</button>
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