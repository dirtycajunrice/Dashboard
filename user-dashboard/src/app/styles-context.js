import React, { createContext, useContext } from 'react';

// Create the context
const StylesContext = createContext();

// Custom hook to access the context
const useStylesContext = () => {
  return useContext(StylesContext);
};

export { StylesContext, useStylesContext };