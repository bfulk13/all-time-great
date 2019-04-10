module.exports = {
    getPsByLikes: (req, res) => {
        const db = req.app.get('db');
        db.profiles.get_ps_by_likes().then(resp => {
            //console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
    
}