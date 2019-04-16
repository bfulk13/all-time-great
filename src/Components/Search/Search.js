import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateQuestion, updateAnsArray} from '../../redux/reducer'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      
    }
  }
  searchForStuff = () => {
    let res = axios.post('/searchforquestions')
  }

  

  render() {
    

    return (
      <div className='Search'>
       <form action="">
       <input type="text" placeholder="na"/></form>
       <button onClick={this.searchForStuff()}>Seacrch</button>
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