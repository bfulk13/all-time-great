module.exports = {

  // getComments: (req, res) => {
  //   const db = req.app.get('db')
  //   const {}
  // },

  addNewComment: (req, res) => {
    const db = req.app.get('db')
    const {Forum} = req.body
    let date = new Date()
    db.comments.add_new_comment(Forum.comments[i], date)
  }
}