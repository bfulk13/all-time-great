module.exports = {
    getPsByLikes: async (req, res) => {
        const db = req.app.get('db');
        
        db.profiles.get_ps_by_likes().then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    getProfile: async (req, res) => {
        const db = req.app.get('db');
        const { uid } = req.session.user;

        let profile = await db.profiles.get_profile({ uid }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    viewProfile: async (req, res) => {
        // console.log(req.params)
        const db = req.app.get('db');
        const { id } = req.params;
        // console.log(uid, 3)
        let profile = await db.profiles.view_profile({ id }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
    
}

/* #026670, #9FEDD7, #FEF9C7, #FCE181, #EDEAE5 */