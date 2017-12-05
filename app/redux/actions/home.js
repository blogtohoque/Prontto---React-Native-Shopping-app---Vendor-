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
            }
            callback(data)
        });
    }
}

