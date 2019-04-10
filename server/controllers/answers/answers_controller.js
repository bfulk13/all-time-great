module.exports = {

  // ------------Vote Page---------------//
  getAnswers: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.answers.get_answers({id}).then(response => {
      // console.log(response)
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
    if(already_answered > 0){
      res.status(409).send(err)
    } else {
      await db.answers.increment_vote({aid})
      res.sendStatus(200)
    }
  },

    // -----------Result Page--------------//
    getAnswerResults: (req, res) => {
      const db = req.app.get('db')
      console.log("xxxx", req.body)
      const {qid, uid} = req.body
      db.answers.get_answer_results({qid, uid}).then(response => {
        console.log(22222, response)
        res.send(200).send(response)
      }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
    }


}