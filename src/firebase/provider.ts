import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithCredential,
} from 'firebase/auth';
import {auth} from './config';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '515376685392-o5s3bq6ugevbbefm3fgb21gehvauskgu.apps.googleusercontent.com',
});

const googleProvider = new GoogleAuthProvider();

interface AuthResponse {
  ok: boolean;
  uid?: string;
  photoURL?: string | null; // Ajuste aquí
  email?: string;
  phoneNumber?: string | null;
  errorMessage?: string;
}

interface RegisterUserProps {
  email: string;
  password: string;
  phoneNumber: string;
}

interface LoginProps {
  email: string;
  password: string;
}

// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const {email, photoURL, uid, phoneNumber} = result.user;

//     return {
//       ok: true,
//       email,
//       photoURL,
//       uid,
//       phoneNumber,
//     };
//   } catch (error: any) {
//     const errorMessage = error.message;
//     return {
//       ok: false,
//       errorMessage,
//     };
//   }
// };

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = GoogleAuthProvider.credential(idToken);
    const resp = await signInWithCredential(auth, googleCredential);
    const {uid, photoURL, phoneNumber, email} = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      phoneNumber,
      email,
    };
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return {
        ok: false,
        errorMessage: 'Cancelado',
      };
    }
    if (error.code === statusCodes.IN_PROGRESS) {
      return {
        ok: false,
        errorMessage: 'En progreso',
      };
    }
    if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return {
        ok: false,
        errorMessage: 'Servicios de Google no disponibles',
      };
    }
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  phoneNumber,
}: RegisterUserProps): Promise<AuthResponse> => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);
    const {uid, photoURL, phoneNumber} = resp.user;

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {photoURL});
    }

    return {
      ok: true,
      uid,
      phoneNumber: phoneNumber || null,
      photoURL: photoURL || null, // Ajuste aquí
      email,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const loginWithEmailPassword = async ({email, password}: LoginProps) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    const {uid, photoURL, phoneNumber} = resp.user;
    return {
      ok: true,
      uid,
      photoURL,
      phoneNumber,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const logoutFirebase = async () => {
  return await auth.signOut();
};
