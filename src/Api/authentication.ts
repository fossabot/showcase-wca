
import {
  setUILoading, clearUILoading, openSnackbar,
  SetUILoadingAction, SetUIStopLoadingAction, OpenSnackbarAction,
} from 'src/Store/ui/UIActions';
import {
  saveUserData, SaveUserAction, logoutUser, LogoutUserAction,
} from 'src/Store/user/UserActions';
import firebase from './firebase';

export const signInWithEmailPassword = (email: string, password: string) => (
  dispatch: (
    arg0: SetUILoadingAction | SetUIStopLoadingAction | SaveUserAction | OpenSnackbarAction
  ) => void,
): void => {
  dispatch(setUILoading());
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      dispatch(saveUserData(result.user));
      dispatch(openSnackbar('You have been successfully signed in.'));
      dispatch(clearUILoading());
    })
    .catch((error) => {
      dispatch(openSnackbar(error.message));
      dispatch(clearUILoading());
    });
};

export const signOut = () => (
  dispatch: (
    arg0: OpenSnackbarAction | LogoutUserAction
  ) => void,
): void => {
  firebase.auth().signOut()
    .then(() => {
      dispatch(openSnackbar('You have been successfully signed out.'));
      dispatch(logoutUser());
    })
    .catch((error) => dispatch(openSnackbar(error.message)));
};
