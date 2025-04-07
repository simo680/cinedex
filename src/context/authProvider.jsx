import { createContext, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // function signInWithGoogle() {
  //   // const provider = new GoogleAuthProvider();
  //   return signInWithPopup(auth, provider);
  // }

  // function logout() {
  //   return signOut(auth);
  // }

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       setUser(currentUser);
  //     } else {
  //       setUser(null);
  //     }
  //     setIsLoading(false);
  //   });
  // }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
