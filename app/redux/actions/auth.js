import * as types from './types'
import * as firebase from "firebase";



export function sendVerificationCode(pNumber, callback) {
    return function (dispatch) {
        callback('success')   
    }
}

export function confirmVerificationCode(number, code, callback) {
    return function (dispatch) {
        const email = number + '@prontto.com'
        const pwd = 'password'
        firebase.auth().signInWithEmailAndPassword(email, pwd)
        .then(userInfo => {
            let path = '/Vendors/' + userInfo.uid;
            firebase.database().ref(path).on('value', (snapshot) => {    
                let data = {};    
                if (snapshot.val()) {
                    data = snapshot.val();
                    dispatch(saveUserData(data))
                }
                else{
                    alert("Can't get data!")
                } 
            });     
            callback('success')         
        })
        .catch(error => {
            callback('register')
        })
    }
}

export function resendCode(callback){
    return function (dispatch) {
        callback('success')
    }
}

export function register(firstName, lastName, number, callback) {
    return function (dispatch) {
        const email = number + '@prontto.com'
        const pwd = 'password'
        firebase.auth().createUserWithEmailAndPassword(email, pwd)
        .then(userInfo => {
            let path = "/Vendors/" + userInfo.uid 
            let data = {
                firstName,
                lastName,
                photo: '',
                email: '',
                phone: number,
                location: {},
                uid: userInfo.uid
            }
            firebase.database().ref(path).set(data)
            dispatch(saveUserData(data))
            callback('success')
        })
        .catch(error => callback(error.toString()))
    }
}

export function saveUserData(data) {
    return{
        type: types.SET_USER_DATA,
        data
    }
}