import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TypeRootState } from "@/app/store/store";

export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector;
