import React, { Component } from 'react';
import './Questions.css'
import axios from 'axios';
import { Link } from 'react-router-dom'
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
    // console.log(this.props)
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
    // console.log(res)
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
    // console.log(val, str)
  }

  updateQuestion = async (val) => {

    this.setState({
      question: val
    })
  }

  createNewQuestion = async () => {
    // add in IF redundancy if q or qimg is blank
    const { uid} = this.props.reduxState
    const { question, q_img, answers } = this.state
    console.log(this.state)
    let body = { question, q_img, uid, answers }
    if (uid && question && answers) {
      this.sendPhoto()
      let res = await axios.post('/api/addnewquestion', { body })
    } else {
      alert('Please login and post a question.')
    }
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

  // event handler for file input (s3)
  handlePhoto = async (event, i) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = async photo => {
      await this.setState({
        file: photo.target.result,
        filename: file.name,
        filetype: file.type,
        img: '',
      }, this.updateAnswerImg(i, file));
    };
    // console.log(1234, this.state, i)
    reader.readAsDataURL(file);
  }

  handlePhoto1 = async (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = async photo => {
      await this.setState({
        file: photo.target.result,
        filename: file.name,
        filetype: file.type,
        img: '',
      });
    };
    reader.readAsDataURL(file);
    console.log(file)
  }

  updateAnswerImg(index, filename) {
    let newans = [...this.state.answers]
    newans[index].ans_img = filename
    console.log(123412341, filename)
    this.setState({
      answers: newans
    })
  }

  // when clicked it upload
  sendPhoto = (event) => {
    console.log(this.state)
    return axios.post('/api/s3', {
      file: this.state.file,
      filename: this.state.filename,
      filetype: this.state.filetype
    }).then(response => {
      this.setState({
        q_img: response.data.Location,

      });
    });
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




  render() {
    const inputBoxes = this.state.answers.map((answer, i) => {
      return (
        <div key={i}>
          <input className="answer-text" type="text" placeholder={answer.answerName} onChange={(e) => this.updateAnswer(e.target.value, answer.answerName, answer.ans_img)} />
          <input className="answer-image-file" type="file" id="real" onChange={(e) => this.handlePhoto(e, i)} />
        </div>
      )
    })
    const { open } = this.state
    const trendingQuestions = this.state.trendingQuestionsArr.map(obj => {
      return (
        <div className='SingleQuestionDiv' key={obj.qid}>
          {/* Need to have redux update the question id on click so the render on /vote can pull the right question */}
          {
            <Link to={`/Vote/${obj.qid}`} id={obj.id}><h4>{obj.question}</h4></Link>}
          <img src={obj.q_img} alt="" className="QuestionImg" />
        </div>
      )
    })

    return (
      <div className='Questions'>
        <h1>Trending Questions</h1>
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
            <h2>Add Your Question and Answers</h2>
            <input placeholder="Question" className="question-input" type="text" onChange={(e) => { this.updateQuestion(e.target.value) }} />
            <input className="file-input" type="file" id="real" onChange={this.handlePhoto1} />
            {/* <div>
          <img src={this.state.img} alt="none" />
        </div> */}
            {inputBoxes}
            <i className="fas fa-plus-circle fa-2x" onClick={this.buildAnswersJSX}></i>
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

export default connect(mapStateToProps, null)(Questions);