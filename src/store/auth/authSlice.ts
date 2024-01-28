import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    uid: string | null;
    email: string | null;
    photoURL: string | null;
    errorMessage: string | null;
}

const initialState: AuthState = {
    status: 'checking',
    uid: null,
    email: null,
    photoURL: null,
    errorMessage: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ uid: string; email: string; photoURL: string }>) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, action: PayloadAction<{ errorMessage?: string }>) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.photoURL = null;
            state.errorMessage = action.payload?.errorMessage || null;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;


export default authSlice.reducer;
