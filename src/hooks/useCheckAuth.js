import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { auth } from '../firebase/config';

export const useCheckAuth = () => {
    const { status } = useSelector((state) => state.auth); // You may need to adjust the type of state accordingly

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) return dispatch(logout());
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
        });
    }, [dispatch]);

    return status;
};
