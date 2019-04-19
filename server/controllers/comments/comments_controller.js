module.exports = {

  getComments: (req, res) => {
    const db = req.app.get('db')
    const {qid} = req.body
    db.comments.get_comments({qid}).then(response => {
        res.status(200).send(response)
      })
  },

  addNewComment: (req, res) => {
    const db = req.app.get('db')
    const body = req.body
    let date = new Date()
    db.comments.add_new_comment(body.comment, body.uid, body.qid, date, body.avatar, body.username).then(dbRes => {
      res.sendStatus(200)
    })

  }
}