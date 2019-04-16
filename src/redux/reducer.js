
const initialState = {
    uid: 0,
    username: '',
    avatar: '',
    qid: 0,
    question: '',
    q_img: '',
    ansArr: []
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';
const UPDATE_QUESTION = 'UPDATE_QUESTION'
const UPDATE_ANS_ARRAY = 'UPDATE_ANS_ARRAY'

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

export function updateQuestion(question) {
    return {
        type: UPDATE_QUESTION,
        payload: question
    }
}
export function updateAnsArray(ansArr) {
    return {
        type: UPDATE_ANS_ARRAY,
        payload: ansArr
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
            const {qid, question, q_img} = payload
            return {...state, qid, question, q_img}
        case UPDATE_ANS_ARRAY:        
            return {...state, ansArr: payload}
        default:
        return state
    }

}