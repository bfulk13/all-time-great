module.exports = {
  getQsByVotes: (req, res) => {
    const db = req.app.get('db');

    db.questions.get_qs_by_votes().then(resp => {
      res.status(200).send(resp)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  },
  //------------Questions page--------------//
  getAllQs: (req, res) => {
    try {
      const db = req.app.get('db')
      db.questions.get_all_questions().then(response => {
        res.status(200).send(response)
      })
    } catch (err) {
      console.log(err)
    }
  },
  getQ: (req, res) => {
    // console.log(1111, req.params)
    try {
      let { id } = req.params
      id = parseInt(id)
      const db = req.app.get('db')
      db.questions.get_question({ id }).then(response => {
        res.status(200).send(response)
      })
    } catch (err) {
      console.log(err)
    }
  },

  getUnansweredQuestions: (req, res) => {
    const db = req.app.get('db');
    const {uid} = req.session.user;
    db.questions.get_unanswered_questions({uid}).then(resp => {
      // console.log(resp)
      res.status(200).send(resp)
    })
  },

  addNewQ: (req, res) => {
    const db = req.app.get('db')
    const { body } = req.body
    db.questions.add_new_question(body.question, body.q_img, body.uid).then(questionInsert => {
      for (let i = 0; i < body.answers.length; i++) {
        db.answers.add_new_answer(body.answers[i].text, body.answers[i].ans_img, questionInsert[0].qid)
      }
      res.sendStatus(200)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  },

  getUserVotes: (req, res) => {
    const db = req.app.get('db')
    db.questions.get_user_votes().then(response => {
      res.status(200).send(response)
    }).catch(err =>
      console.log(err))
  },
  searchBarQuestions: (req, res) => {
    const db = req.app.get('db')
    const { string } = req.body
    db.questions.get_search_bar_questions(string).then(response => {
      res.status(200).send(response)
    }).catch(err =>
      console.log(err))
  },
  canLike: async (req, res) => {
    const db = req.app.get('db')
    const { uid, qid } = req.body
    let canLike = await db.questions.already_liked({uid, qid})
    console.log('hit', canLike)
    if (+canLike[0].count < 1){
      res.status(200).send(true)
    } else{
      res.status(200).send(false)
    }
  },
  incrementLike: async (req, res) => {
    const {qid, uid} = req.body
    const db = req.app.get('db')
    try {
        await db.questions.increment_liked({qid})
        await db.voted.add_to_voted({qid, uid})
        res.sendStatus(200)
      } catch (err) {
      console.log(err)
    }

  }
}

