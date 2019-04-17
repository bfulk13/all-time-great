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
      try{
      const db = req.app.get('db')
      db.questions.get_all_questions().then(response => {
        res.status(200).send(response)
      })}catch(err){
        console.log(err)
  }
    },
    getQ: (req, res) => {
      try{
        const {id} = req.params
      const db = req.app.get('db')
      db.questions.get_question({id}).then(response => {
        res.status(200).send(response)
      })}catch(err){
        console.log(err)
  }
    },
    
    addNewQ: (req, res) => {
      const db = req.app.get('db')
      const { body } = req.body
      db.questions.add_new_question(body.question, body.q_img, body.uid).then(questionInsert => {
        for(let i=0; i < body.answers.length; i++){
          db.answers.add_new_answer(body.answers[i].text , body.answers.ans_img, questionInsert[0].qid )
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
      const {string} = req.body
      db.questions.get_search_bar_questions(string).then(response => {
        res.status(200).send(response)
      }).catch(err => 
        console.log(err))
    },
}