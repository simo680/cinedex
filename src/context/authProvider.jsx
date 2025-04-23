import { createContext, useEffect, useState } from "react";
import supabase from "../services/supabase/supabase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Получаем текущего пользователя
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setIsLoading(false);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // const signInWithGoogle = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //   });
  //   if (error) console.error("Ошибка входа через Google:", error.message);
  // };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Ошибка выхода:", error.message);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
