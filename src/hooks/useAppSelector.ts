import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TypeRootState } from "@/src/store/store";

export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector;
