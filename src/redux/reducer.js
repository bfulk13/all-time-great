
const initialState = {
    id: 0,
    username: '',
    img: ''
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';


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

export default function reducer(state = initialState, action) {
    const {payload, type} = action
    switch(type) {
        case UPDATE_USER:
          const {id, username, img} = payload
          return {...state, id, username, img}
        case CLEAR_USER:
          return {...state, id:0, username: '', img: ''}
        default:
        return state
    }

}