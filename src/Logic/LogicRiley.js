import axios from 'axios'


export function getAllQuestionsFromDb(){
 
  let res = axios.get('/api/getallquestions')
    return res.data
}
export function updateQuestion(val){
  this.setState({
    question: val
  })
}