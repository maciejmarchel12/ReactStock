import React, { useState, createContext } from "react";
import { login, signup } from "../api/reactStock-backend";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
    const [permissionLevel, setPermissionLevel] = useState("");
    // Remove the unused variables authToken and userName
  
    // Function to put JWT token in local storage.
    const setToken = (data) => {
      localStorage.setItem("token", data);
      // Remove the unused authToken
    };
  
    const authenticate = async (username, password, permissionLevel) => {
      try {
        const result = await login(username, password, permissionLevel);
  
        if (result.token) {
          setToken(result.token);
          setIsAuthenticated(true);
          setPermissionLevel(result.permissionLevel);
          // Remove the unused userName
        } else {
          // If the result doesn't contain a token, throw an error
          throw new Error("Authentication failed. Invalid username or password.");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        throw error;
      }
    };

    const register = async (username, password, permissionLevel) => {
      try {
        const success = await signup(username, password, permissionLevel);
        if (success) {
          setToken(success.token); // Assuming `signup` returns an object with a `token` property upon success
          setIsAuthenticated(true);
          setPermissionLevel(permissionLevel); // Set permission level
        }
        return success; // Return the success response from the backend
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    };
  
    const signout = () => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    };
  
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          permissionLevel,
          authenticate,
          register,
          signout,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContextProvider;