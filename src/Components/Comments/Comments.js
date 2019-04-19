import React, {Component} from 'react'
import './Comments.css'
import axios from 'axios'
import { connect } from 'react-redux'

class Comments extends Component {
  constructor(){
    super()
    this.state = {
      Forum: {
        Comments: [
          {
          comment: ''
          }
        ]
      }
    }
  }

  componentDidMount(){
    this.getAllComments()
  }

  // componentDidUpdate(prevState){
  //   if(prevState !== this.state){
  //     this.fetchData(this.state)
  //   }
  // }

  updateComments = (val) => {
    let Forum = this.state.Forum
    let comment = Forum.Comments[0].comment
    comment = val
    Forum.Comments[0].comment = comment
    this.setState({
      Forum: Forum
    })
    console.log(this.state.Forum.Comments[0].comment)
  }

  getAllComments = () => {
    let body = { qid: this.props.qid}
    axios.post('/api/getcomments', body).then(res => {
      this.setState({
        Forum: {
          Comments: res.data
        }
      })
    })
  }

  addNewComment =  () => {
    let uid = this.props.uid
    let qid = this.props.qid
    let avatar = this.props.avatar
    let username = this.props.username
    let comment = this.state.Forum.Comments[0].comment
    const body = {uid, qid, avatar, username, comment}
    axios.post('/api/addnewcomment', body).then(res => {
      this.getAllComments()
    }).catch(err => {
      console.log(err)
    })
  }

  render(){
    const mappedComments = this.state.Forum.Comments.map((comment) => {
      let img = <img src={comment.user_avatar} alt=""/>  ?  <img className='ProfileImage' src={comment.user_avatar} alt=""/> : <h4>No image</h4>
      let date = comment.date ? comment.date.split("").slice(0, 10).join("").split("-") : null
      let vat = date ? date.shift().toString() : null
      var fish = vat ? date.push(vat) : null
      date = date ? date.join("-") : null
      return(
        <div key={comment.cid} className='Comments'>
        <div className="Diveydiv">
          {img}
          <h6 className="Username">{comment.user_username}</h6>
          <h6>{date}</h6>
        </div>
          <div>
            <p>{comment.comments}</p>
          </div>
        </div>
      )
    })
    return(
      <div className='AllComments'>
      {mappedComments}
      <input placeholder='Add a comment!' onChange={(e) => this.updateComments(e.target.value)}></input>
      <button onClick={() => this.addNewComment()}>Post</button>
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