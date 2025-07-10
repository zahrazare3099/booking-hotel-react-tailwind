import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

const FAKE_USER = { email: "test@gmail.com", password: "0000" };

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case "logout":
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error("unkown type for Authentication context");
  }
};

export default function AuthProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  function login({ email, password }) {
    if (email == FAKE_USER.email && password == FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const res = useContext(AuthContext);
  if (res === undefined) throw new Error("out of the Auth provider");
  return res;
}
