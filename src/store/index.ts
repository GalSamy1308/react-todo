import { configureStore } from '@reduxjs/toolkit'
import todoSliceReducer from "./slices/TodoSlice";
const store =configureStore({
    reducer: {
        todoSlice: todoSliceReducer,
    },
})
export default store;
export type RootState = ReturnType<typeof store.getState>;
