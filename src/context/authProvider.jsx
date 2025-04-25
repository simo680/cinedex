import { createContext, useEffect, useState } from "react";
import supabase from "../services/supabase/supabase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserAndProfile = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData?.user || null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", currentUser.id)
          .single();

        if (profileData && !error) {
          setProfile(profileData);
        }
      }

      setIsLoading(false);
    };

    getUserAndProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);

        if (currentUser) {
          const { data: profileData, error } = await supabase
            .from("profiles")
            .select("username, avatar_url")
            .eq("id", currentUser.id)
            .single();

          if (profileData && !error) {
            setProfile(profileData);
          }
        } else {
          setProfile(null);
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
