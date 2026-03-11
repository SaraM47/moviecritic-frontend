import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Typed version of the Redux dispatch hook. This ensures that dispatch knows the correct AppDispatch type, which includes async thunks and other Redux Toolkit features.
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed version of the Redux selector hook. This ensures that dispatch knows the correct AppDispatch type, which includes async thunks and other Redux Toolkit features.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;