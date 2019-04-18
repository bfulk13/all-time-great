import React, {Component} from 'react'
import './Comments.css'

class Comments extends Component {
  constructor(){
    super()
    this.state = {
      Forum: {
        Comments: []
      }
    }
  }

  updateComments = (val, i) => {
    let Forum = this.state.Forum
    Forum.Comments[i].comment = val
    this.setState({
      Forum
    })
    console.log(this.state)
  }

  render(){
    const mappedComments = this.state.Forum.Comments.map((comment) => {
      return(
        <div key={comment.id} className='Comments'>
          
        </div>
      )
    })
    return(
      <div>
      <input placeholder='Add a comment!' onChange={(e) => this.updateComments(e.target.value)}></input>
      <button>Post</button>
        {/* {mappedComments} */}
      </div>
    )
  }
}

export default Comments;