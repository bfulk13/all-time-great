import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {connect} from 'react-redux'
import {updateQuestion, updateAnsArray} from '../../redux/reducer'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      
    }
  }
  

  render() {
    

    return (
      <div className='Search'>
       
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