import store from 'src/Store';
import { saveUserData } from 'src/Store/user/UserActions';
import firebase from '.';

const verifyAuth = (): void => {
  firebase
    .auth()
    .onAuthStateChanged((user) => store.dispatch(saveUserData(user)));
};

export default verifyAuth;