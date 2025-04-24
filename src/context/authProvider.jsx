import { createContext, useEffect, useState } from "react";
import supabase from "../services/supabase/supabase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setIsLoading(false);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Ошибка выхода:", error.message);
  };

  const updateProfile = async (newData) => {
    const { data, error } = await supabase.auth.updateUser({
      data: newData,
    });

    if (error) {
      console.error("Ошибка обновления профиля:", error.message);
    } else {
      setUser(data.user); // обновляем данные
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
