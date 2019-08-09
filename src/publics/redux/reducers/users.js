import { AsyncStorage } from 'react-native'

const initialState = {
    isLoading: false,
    isLogin: false,
    tokenState: '',
    contacts: [],
    addContact: []
}

export default users = (state = initialState, action) => {

    switch (action.type) {

        case 'LOGIN_PENDING':
        case 'CONTACTS_PENDING':
        case 'ADD_CONTACT_PENDING':
            return {
                ...state,
                isLoading: true,
            }

        case 'LOGIN_REJECTED':
        case 'CONTACTS_REJECTED':
        case 'ADD_CONTACT_REJECTED':
            return {
                ...state,
                isLoading: false,
            }

        case 'LOGIN_FULFILLED':
            AsyncStorage.setItem('token', action.payload.data.token)
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                tokenState: action.payload.data
            }
        case 'CONTACTS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                contacts: action.payload.data.data
            }
        case 'ADD_CONTACT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                addContact: [...state.addContact, action.payload.data]
            }

        default:
            return state;
    }
}