import axios from 'axios'

export async function login(){
    const {username, password} = this.state
    try {
        let res = await axios.post(`/auth/login`, {username, password})
        this.props.updateUser(res.data)
    } catch(err) {
        console.log(err)
    }
 }


 export async function register(){
    try {
        const {username, password, avatar} = this.state
        let res = await axios.post(`/auth/register`, {username, password, avatar})
        this.props.updateUser(res.data)
    } catch(err) {
        console.log(err)
    }
 }