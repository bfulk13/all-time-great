module.exports = {
    getQsByVotes: (req, res) => {
        const db = req.app.get('db');

        db.questions.get_qs_by_votes().then(resp => {
            //console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    //------------Questions page--------------//
    getAllQs: (req, res) => {
      const db = req.app.get('db')
      db.questions.get_all_questions().then(response => {
        console.log(response)
        res.status(200).send(response)
      }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
    },
    
    addNewQ: (req, res) => {
      const db = req.app.get('db')
      const {question, q_img, owner_id} = req.body
      db.questions.add_new_question([question, q_img, owner_id]).then(response => {
        res.status(200).send(response)
      }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
    },
    // ------------Vote Page---------------//
    getAnswers: (req, res) => {
      const db = req.app.get('db')
      const {id} = req.params
      db.answers.get_answers([id]).then(response => {
        console.log(response)
        res.status(200).send(response)
      }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
    },
    createAnswer: async (req, res) => {
      const db = req.app.get('db')
      const {aid, uid, qid} = req.body
      let already_answered = await db.answers.already_answered([uid, qid])
      if(already_answered > 0){
        res.status(409).send(err)
      } else {
        await db.answers.increment_vote([aid])
        res.sendStatus(200)
      }
    },
    // -----------Result Page--------------//
    getAnswerResults: (req, res) => {
      const db = req.app.get('db')
      const {qid, aid, uid} = req.body
      db.answers.get_answer_results([qid, aid, uid]).then(response => {
        console.log(response)
        res.send(200).send(response)
      }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
    }
}