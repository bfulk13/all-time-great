module.exports = {
    getPsByLikes: async (req, res) => {
        const db = req.app.get('db');
        
        db.profiles.get_ps_by_likes().then(resp => {
            //console.log(resp)
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
        const db = req.app.get('db');
        const { uid } = req.params;

        let profile = await db.profiles.view_profile({ uid }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
    
}

/* #026670, #9FEDD7, #FEF9C7, #FCE181, #EDEAE5 */