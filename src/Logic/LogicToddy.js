import axios from 'axios'

export function getResults(){
  let body = {
    qid: this.props.qid,
    uid: this.props.uid
  }
  let res = axios.post('/api/getanswerresults', body)
  
  this.setState({
    answersArr: res.data,
    question: this.props.question
  })
  this.setState({
    ans1votes: this.state.answersArr[0].vote,
    ans2votes: this.state.answersArr[1].vote,
    ans3votes: this.state.answersArr[2] ? this.state.answersArr[2].vote: null ,
    ans4votes: this.state.answersArr[3] ? this.state.answersArr[3].vote: null,
    ans1: this.state.answersArr[0].answer,
    ans2: this.state.answersArr[1].answer,
    ans3: this.state.answersArr[2] ? this.state.answersArr[2].answer : null,
    ans4: this.state.answersArr[3] ? this.state.answersArr[3].answer : null
   })
}