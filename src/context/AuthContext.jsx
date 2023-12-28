/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const login = (user) => {
    setUser(user);
  };

  useEffect(() => {
    // Check for user in local storage when the component mounts
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      login(storedUser);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
