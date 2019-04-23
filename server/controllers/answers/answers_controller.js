module.exports = {

  // ------------Vote Page---------------//
  getAnswers: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.answers.get_answers({ id }).then(response => {
      res.status(200).send(response)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  },
  incrementAnswer: async (req, res) => {
    // console.log(req.body)
    const { aid, qid, uid } = req.body
    const db = req.app.get('db')
    try {
      let canVote = await db.answers.already_answered({ uid, qid })
      // console.log(canVote)
      if (+canVote[0].count < 1) {
        await db.answers.increment_vote({ aid })
        await db.answers.add_to_voted_table({ qid, uid })
        res.sendStatus(200)
      } else{
        res.status(409).send('you already voted on dis one fool')
      }
    } catch (err) {
      console.log(err)
    }
  },

  canVote: async (req, res) => {

    const db = req.app.get('db')
    const { uid, qid } = req.body
    // console.log(7777, uid, qid)
    let canVote = await db.answers.already_answered({
      uid, qid
    })
    if (+canVote[0].count < 1) {
      res.status(200).send(true)
    } else {
      res.status(200).send(false)
    }
  },
  // -----------Profile Page--------------//
  getLiked: (req,res) => {
    const db = req.app.get('db')
    const { id } = req.params;
    // console.log(id)
    db.answers.get_liked({ id }).then(resp => {
      res.status(200).send(resp)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  },

  // -----------Result Page--------------//
  getAnswerResults: (req, res) => {
    const db = req.app.get('db')
    const { qid } = req.body
    db.answers.get_answer_results({ qid }).then(response => {
      res.status(200).send(response)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  }
}