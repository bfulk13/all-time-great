module.exports = {

  // ------------Vote Page---------------//
  getAnswers: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.answers.get_answers({id}).then(response => {
      res.status(200).send(response)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
  })
  },
  incrementAnswer: async (req, res) => {
    console.log(req.body)
    try{
    const db = req.app.get('db')
    const {aid, qid, uid} = req.body
    await db.answers.increment_vote({aid})
    // db.answers.add_to_voted_table({qid, uid})
    res.sendStatus(200)
  } catch(err){
    console.log(err)
  }
},

  canVote: async (req, res) => {
    const db = req.app.get('db')
    const {uid, qid} = req.body
    let canVote = await db.answers.already_answered({uid, qid})
      if(canVote[0].count > 0){
        res.status(200).send(false)
      } else {
        res.status(200).send(true)
      }
  },

    // -----------Result Page--------------//
    getAnswerResults: (req, res) => {
      const db = req.app.get('db')
      const {qid} = req.body
      db.answers.get_answer_results({qid}).then(response => {
        res.status(200).send(response)
      }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
    }


}