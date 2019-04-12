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
      const {question, q_img, owner_id, q_id, answer, ans_img} = req.body
      db.questions.add_new_question({question, q_img, owner_id}).then(response => {
        res.status(200).send(response)
      }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
    },
    
  
}