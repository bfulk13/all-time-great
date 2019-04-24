import React, { Component } from 'react';
import './Questions.css'
import axios from 'axios';
import { updateQuestion, updateAnsArray } from '../../redux/reducer'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux';




class Questions extends Component {
  constructor() {
    super()
    this.state = {
      trendingQuestionsArr: [],
      getUservotes: [],
      question: '',
      q_img: '',
      open: false,
      answers: [
        {
          answerName: 'answer1',
          text: '',
          ans_img: ''
        },
        {
          answerName: 'answer2',
          text: '',
          ans_img: ''
        }
      ],
      file: '',
      filename: '',
      filetype: '',
      img: ''
    }
  }

  onOpenModal = () => {
    this.setState({
      open: true
    })
  }

  onCloseModal = () => {
    this.setState({
      open: false
    })
  }

  componentDidMount() {
    this.getAllQuestions()
    this.getUserVotes()
  }
  getUserVotes = () => {
    axios.get('/api/getuservotes').then(res => {
      this.setState({
        getUserVotes: res.data
      })
    })
  }

  getVotedValues = async () => {
    let res = await axios.get('/api/get')
  }

  getAllQuestions = async () => {
    let res = await axios.get('/api/getallquestions')
    this.setState({
      trendingQuestionsArr: res.data
    })
  }

  updateAnswer = (val, str, img) => {
    // const {answerName} = this.state.answer
    let foundIndex = this.state.answers.findIndex((answer) => {
      return answer.answerName === str
    })
    const newAnswers = this.state.answers.slice()
    newAnswers[foundIndex].text = val
    newAnswers[foundIndex].ans_img = img
    this.setState(prevState => ({
      answers: newAnswers
    }))
  }

  updateQuestion = async (val) => {
    this.setState({
      question: val
    })
  }

  createNewQuestion = async () => {
    // add in IF redundancy if q or qimg is blank
    const { uid } = this.props.reduxState
    const { question, q_img, answers } = this.state
    let body = { question, q_img, uid, answers }
    if (uid && question && answers) {
      let res = await axios.post('/api/addnewquestion', { body })
      console.log(res)
    } else {
      alert('Please login and post a question.')
    }
    this.onCloseModal()
    this.getAllQuestions()
  }

  buildAnswersJSX = () => {
    if (this.state.answers.length < 4) {
      const newAnswer = {
        answerName: `answer${this.state.answers.length + 1}`,
        text: '',
        ans_img: ''
      }
      this.setState(prevState => ({
        answers: [...prevState.answers, newAnswer]
      }))
    } else {
      alert('Only four answers please!')
    }
  }
  removeAnswerJSX = () => {
    if (this.state.answers.length > 2) {
      
      this.setState(prevState => ({
        answers: prevState.answers.slice(0, prevState.answers.length-1)
      }))
    } else {
      alert('Needs at least 2 answers please')
    }
  }


  // event handler for file input (s3)
  handlePhotoAnswers = async (event, i) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = async photo => {
      await this.setState({
        file: photo.target.result,
        filename: file.name,
        filetype: file.type,
        img: '',
      })
      let ans_img = await this.sendPhoto()
      let answersArrCopy = this.state.answers.slice()
      answersArrCopy[i].ans_img = ans_img
      this.setState({
        answers: answersArrCopy
      })
    };
    reader.readAsDataURL(file);
  }

  handlePhotoQuestion = async (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = async photo => {
      await this.setState({
        file: photo.target.result,
        filename: file.name,
        filetype: file.type,
        img: '',
      });
      let q_img = await this.sendPhoto()
      this.setState({
        q_img: q_img
      })
    };
    reader.readAsDataURL(file);
  }

  updateAnswerImg(index, filename) {
    let newans = [...this.state.answers]
    newans[index].ans_img = filename
    this.setState({
      answers: newans
    })
  }

  // when clicked it upload
  sendPhoto = () => {
    return axios.post('/api/s3', {
      file: this.state.file,
      filename: this.state.filename,
      filetype: this.state.filetype
    }).then(response => {
      return response.data.Location

    }).catch(err => console.log(err));
  }

  updatePhotoOnState = (img, i) => {
    let newStateCopy = Object.assign({}, this.state)
    return axios.post('/api/s3', this.state).then(response => {
      newStateCopy.answers[i].ans_img = img
      this.setState({
        answers: newStateCopy.answers
      });
    });
  }

  CheckVotedOrNot = async (obj) => {
    let body = { qid: obj.qid, uid: this.props.reduxState.uid }
    let canVote = await axios.post('/api/ifVoted', body)
    console.log('canvote', canVote)
    if (canVote.data === true) {
      let quest = await axios.get(`/api/question/${obj.qid}`)
      let res = await axios.get(`/api/getanswersforquestion/${obj.qid}`)
      this.props.updateQuestion(obj)
      this.props.updateAnsArray(res.data)
      this.setState({
        question: quest.data[0],
        answers: res.data,
      })
      this.props.history.push(`/Vote/${this.props.reduxState.qid}`)
    } else if (canVote.data === false) {
      this.props.updateQuestion(obj)
      this.setState({
        question: this.props.question,
        answers: this.props.answers,
        qid: this.props.qid
      })
      this.props.history.push('/Result')
    }
  }

  render() {
    const inputBoxes = this.state.answers ? this.state.answers.map((answer, i) => {
      return (
        <div key={i} className='addAnswer-div'>
          <input className="answer-input" type="text" placeholder={answer.answerName} onChange={(e) => this.updateAnswer(e.target.value, answer.answerName, answer.ans_img)} />
          <input className="answer-image-file" type="file" id="real" onChange={(e) => this.handlePhotoAnswers(e, i)} />
        </div>
      )
    }) : null
    const { open } = this.state
    const trendingQuestions = this.state.trendingQuestionsArr.map(obj => {
      return (
        <div className='SingleQuestionDiv' key={obj.qid}>
          {<div onClick={() => this.CheckVotedOrNot(obj)}><h4>{obj.question}</h4></div>}
          <img src={obj.q_img} alt="" className="QuestionImg" />
        </div>
      )
    })

    return (
      <div className='Questions'>
        <h1>Questions</h1>
        <div className='QuestionsDiv'>
          <div>
            <div className="PlusSignDiv" onClick={this.onOpenModal} >
              <img className="PlusSign" src="http://pngimg.com/uploads/plus/plus_PNG122.png" alt="plus sign" />
            </div>
            <p>Add a new Question</p>
            {trendingQuestions}
          </div>

        </div>
        <Modal open={open} onClose={this.onCloseModal} center >
          <div className="question-Modal-Wrapper">
            <h2>Add Your Question</h2>
            <input placeholder="Question" className="question-input" type="text" onChange={(e) => { this.updateQuestion(e.target.value) }} />
            <input className="file-input" type="file" id="real" onChange={this.handlePhotoQuestion} />
            <div>{inputBoxes}</div>
            <div>
              <i className="fas fa-plus-circle fa-2x plus-circle" onClick={this.buildAnswersJSX}></i>
              <i className="fas fa-minus-circle fa-2x" onClick={this.removeAnswerJSX}></i>
            </div>
            
            <button type="submit" onClick={this.createNewQuestion}>Submit</button>
          </div>
        </Modal>
        <div className=''>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}
const mapDispatchToProps = {
  updateQuestion,
  updateAnsArray
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);