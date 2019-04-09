module.exports = {
    getPsByLikes: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;

        db.profiles.get_ps_by_likes({ id }).then(resp => {
            //console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
    
}