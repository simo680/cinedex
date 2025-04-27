import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
