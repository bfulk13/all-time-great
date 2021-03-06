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
        db.profiles.getAll_profiles().then(resp => {
            res.status(200).send(resp)
        })
    },

    getProfile: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        let resp = await db.profiles.get_profile( id )
        let res2 = await db.profiles.get_all_likes_user(id)
            res2 ? res2 : 0
        res.status(200).send({resp, res2})

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
    },

    updateAbout: (req, res) => {
       const db = req.app.get('db')
       const {about} = req.body
       const {id} = req.params
       db.profiles.update_about([about, id]).then(resp => {
       res.status(200).send(resp)
       }).catch(err => {
         res.status(500).send(err)
       })
    },
    updateProfilePic: (req, res) => {
        console.log(req.body)
       const db = req.app.get('db')
       const {pic, id} = req.body
       db.profiles.change_profile_pick({pic, id}).then(() => {
       res.sendStatus(200)
       }).catch(err => {
         res.status(500).send(err)
       })
    },

}

/* #026670, #9FEDD7, #FEF9C7, #FCE181, #EDEAE5 */