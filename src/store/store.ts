import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counter/counterSlice";
import { authSlice } from "./auth";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { routeSlice } from "./routes";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
        route: routeSlice.reducer,
    }, 

})


export type RootState = ReturnType<typeof store.getState>;
export const AppDispatch:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export const useAppDispatch:()=>typeof store.dispatch = useDispatch