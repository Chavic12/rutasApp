
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../firebase/provider';
import {checkingCredentials, login, logout} from '.';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
      dispatch(checkingCredentials())
  }
}


export const startGoogleSignIn = () => {
  return async (dispatch) => {
      dispatch(checkingCredentials());
      const result = await signInWithGoogle();
      console.log('hola')
      console.log(result)
      if (!result.ok) return dispatch(logout(result.errorMessage))
      dispatch(login(result))
  }
}


export const startCreatingUserWithEmailPassword = ({ email, password, phoneNumber }) => {
  return async (dispatch) => {
      dispatch(checkingCredentials())
      const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, phoneNumber })

      if (!ok) return dispatch(logout({ errorMessage }))
      dispatch(login({ uid, phoneNumber, email, photoURL }))

  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
      dispatch(checkingCredentials());
      const { ok, uid, displayName, errorMessage, photoURL } = await loginWithEmailPassword({ email, password });

      if (!ok) return dispatch(logout({ errorMessage }))
      dispatch(login({ uid, displayName, email, photoURL }))
  }
}


export const startLogout = () => {
  return async (dispatch) => {
      await logoutFirebase()
      dispatch(logout())
  }
}
