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
    const db = req.app.get('db')
    const {aid, uid, qid} = req.body
    let already_answered = await db.answers.already_answered({uid, qid})
    // console.log(already_answered)
    if(already_answered[0].count > 0){
      res.status(409).send(err)

    } else {
      await db.answers.increment_vote({aid, uid, qid})
      res.sendStatus(200)
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