import { useSelector } from "react-redux";
export const useAuthState = () => useSelector((state) => state.auth);
export const useUserState = () => useSelector((state) => state.user);
export const useAccountState = () => useSelector((state) => state.sidebar);
export const useTransactionState = () => useSelector((state) => state.theme);
