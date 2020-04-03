import React, { useState } from "react";

export const BookContext = React.createContext();

export const BookContextProvider = props => {
  const [arrayState, dispatchArrayState] = useState();

  return (
    <BookContext.Provider
      value={{
        arrayState,
        dispatchArrayState
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};
