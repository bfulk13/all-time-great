
const initialState = {
    uid: 0,
    username: '',
    avatar: '',
    qid: 0,
<<<<<<< HEAD
=======
    question: ''
>>>>>>> master
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';
const UPDATE_QUESTION = 'UPDATE_QUESTION'

export function clearUser(user) {
    return {
        type: CLEAR_USER,
        payload: user
    }
}

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateQuestion(qid) {
    return {
        type: UPDATE_QUESTION,
        payload: qid
    }
}


export default function reducer(state = initialState, action) {
    const {payload, type} = action
    switch(type) {
        case UPDATE_USER:
          const {uid, username, avatar} = payload
          return {...state, uid, username, avatar}
        case CLEAR_USER:
          return {...state, uid: 0, username: '', avatar: ''}
        case UPDATE_QUESTION:
            const {qid, question} = payload
            return {...state, qid, question}
        default:
        return state
    }

}