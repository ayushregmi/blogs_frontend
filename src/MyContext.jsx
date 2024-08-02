import React, { createContext, useState } from "react";

// Create the context object
export const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  // Define the state or data you want to share
  const [user, setUser] = useState(null);

  // You can define functions or values to be shared
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <MyContext.Provider value={{ user, updateUser }}>
      {children}
    </MyContext.Provider>
  );
};
