// routeSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RouteState {
  userRoute: Array<{ latitude: number; longitude: number }>;
}

const initialState: RouteState = {
  userRoute: [],
};

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Array<{ latitude: number; longitude: number }>>) => {
      state.userRoute = action.payload;
    },
    clearRoute: (state) => {
      state.userRoute = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRoute, clearRoute } = routeSlice.actions;

export default routeSlice.reducer;
