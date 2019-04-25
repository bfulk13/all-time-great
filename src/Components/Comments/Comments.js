import React, { Component } from 'react'
import './Comments.css'
import axios from 'axios'
import { connect } from 'react-redux'

class Comments extends Component {
  constructor() {
    super()
    this.state = {
      commentsArr: [

      ]
    }
  }

  componentDidMount() {
    this.getAllComments()
  }

  updateComments = (val) => {
    let commentsArr = this.state.commentsArr
    let comment = commentsArr.comment
    comment = val
    commentsArr.comment = comment
    this.setState({
      commentsArr: commentsArr
    })
  }

  getAllComments = async () => {
    let body = { qid: this.props.qid }
    let res = await axios.post('/api/getcomments', body)
    // console.log(res.data)
    this.setState({
      commentsArr: res.data
    })


    // console.log(this.state.commentsArr)
  }

  addNewComment = async () => {
    let uid = this.props.uid
    let qid = this.props.qid
    let avatar = this.props.avatar
    let username = this.props.username
    let comment = this.state.commentsArr.comment
    const body = { uid, qid, avatar, username, comment }
    console.log(1111, body)
    try {
      let res = await axios.post('/api/addnewcomment', body)
      // console.log(res)
      this.getAllComments()
      let commentsArr = this.state.commentsArr
      let comment = commentsArr.comment
      commentsArr.comment = ''
      this.setState({
        commentsArr: commentsArr
      })
    } catch (err) {
      console.log(err)
    }

  }

  render() {
    const mappedComments = this.state.commentsArr.map((comment) => {
      let img = <img src={comment.user_avatar} alt="" /> ? <img className='ProfileImage' src={comment.user_avatar} alt="" /> : <h4>No image</h4>
      let date = comment.date ? comment.date.split("").slice(0, 10).join("").split("-") : null
      let vat = date ? date.shift().toString() : null
      var fish = vat ? date.push(vat) : null
      date = date ? date.join("-") : null
      return (
        <div key={comment.cid} className='Comments'>
          <div className="Diveydiv">
            {img}
            <div className="UserAndDate">
            <h6 className="Username">{comment.user_username}</h6>
            <h6 className="Date">{date}</h6>
          </div>
          </div>
          <div className="Text">
            <p>{comment.comments}</p>
          </div>
        </div>
      )
    })
    return (
      <div className='AllComments'>
        <input value={this.state.commentsArr.comment} maxLength="100" className="CommentInput" placeholder='Add a comment! (limit 100)' onChange={(e) => this.updateComments(e.target.value)}></input>
        <button className="AddNewCommentButton" onClick={() => this.addNewComment()}>Post</button>
        {mappedComments}
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
    answersArr: reduxState.ansArr,
    username: reduxState.username,
    avatar: reduxState.avatar
  }
}


export default connect(mapStateToProps)(Comments);