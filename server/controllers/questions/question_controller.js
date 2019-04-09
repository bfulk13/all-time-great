module.exports = {
    getQsByVotes: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;

        db.questions.get_qs_by_votes({ id }).then(resp => {
            //console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    
    getAllQs: (req, res) => {
        //console.log(req: req, res: res)
    }
}