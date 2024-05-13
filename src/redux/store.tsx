import { createStore } from "redux";
import { Reducer } from "./reducer";

export const Store = createStore(Reducer);

export type RootState = ReturnType<typeof Store.getState>;
