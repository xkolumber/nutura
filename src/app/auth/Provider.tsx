"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const accessToken = await user.getIdToken();
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          accessToken: accessToken,
          auth: auth,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);

      return userCredential;
    } catch (error) {
      throw error;
    }
  };
  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
