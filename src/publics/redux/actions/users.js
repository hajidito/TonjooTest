import axios from 'axios';
import api from './api';

export const login = (username, password) => {
    return {
        type: 'LOGIN',
        payload: axios.post(api + 'authenticate', {
            username: username,
            password: password,
        })
    }
}

export const contacts = (token) => {
    return {
        type: 'CONTACTS',
        payload: axios.get(api + 'contacts?token=' + token)
    }
}

export const addContact = (token, first_name, last_name, email, gender, avatar) => {
    return {
        type: 'ADD_CONTACT',
        payload: axios.put(api + 'contacts?token=' + token, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            avatar: avatar
        })
    }
}