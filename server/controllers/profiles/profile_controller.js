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
    getAllProfiles: (req, res) => {
        const db = req.app.get('db')
        // console.log('hit')
        db.profiles.getAll_profiles().then(resp => {
            res.status(200).send(resp)
            // console.log(resp)
        })
    },

    getProfile: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        let profile = await db.profiles.get_profile({ id }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    viewProfile: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        let profile = await db.profiles.view_profile({ id }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
    
}

/* #026670, #9FEDD7, #FEF9C7, #FCE181, #EDEAE5 */