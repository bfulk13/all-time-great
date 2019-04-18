import React, {Component} from 'react'

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
  }

  render(){
    const mappedComments = this.state.Forum.map(() => {
      return(
        <div>
          <input placeholder='Add a comment!'></input>
          <button>Comment</button>
        </div>
      )
    })
    return(
      <div>
        {mappedComments}
      </div>
    )
  }
}

export default Comments;