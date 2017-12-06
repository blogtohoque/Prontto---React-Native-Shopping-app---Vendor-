import * as types from './types'
import * as firebase from 'firebase'

export function welcome () {
    return{
        type: types.WELCOME,
    }
}

export function searchProduct(data, callback) {
    return function (dispatch) {
        let path = '/Products/' + data;
        firebase.database().ref(path).on('value', (snapshot) => {    
            let data = {};    
            if (snapshot.val()) {
                data = snapshot.val();
            }
            callback(data)
        });
    }
}

export function getImage(uid, callback) {
    return function (dispatch) {
        let path = '/Vendors/' + uid;
        firebase.database().ref(path).on('value', (snapshot) => {    
            let data = '';    
            if (snapshot.val()) {
                data = snapshot.val().photo;
                firebase.storage()
                .ref('profile/' + data)
                .getDownloadURL()
                .then((url) => {
                    firebase.storage().refFromURL(url).getDownloadURL().then((url) => {
                        callback(url);
                    })
                })
            }
            if(data == '') callback(null)
            else{
                
            }
        });
    }
}

export function saveProfile(param, callback) {
    return function (dispatch) {
        let updates = {}
        const path = 'Vendors/' + param.uid
        updates[path] = param
        firebase.database().ref().update(updates).then((res) => {
            callback('success')
        })
        .catch((e) => callback(e.toString()))
    }    
}

export function signOut(callback) {
    return function (dispatch) {
        firebase.auth().signOut()
        callback('success')
    }    
}

