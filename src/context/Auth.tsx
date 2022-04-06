import { createContext } from "react";
import createPersistedState from "use-persisted-state";
const useCounterState = createPersistedState("auth");

interface context {
  auth: any;
  setAuth: any;
}
interface props {
  children: React.ReactNode;
}
export const AuthContext = createContext<context>({
  auth: {},
  setAuth: null,
});

export default function Auth({ children }: props) {
  const [auth, setAuth] = useCounterState();

  const value = {
    auth: auth as any,
    setAuth: setAuth as any,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
