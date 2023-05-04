import "./styles/style.css";
import { useState } from "react";
import { auth, googleProvider } from "../configure/Firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  console.log(auth.currentUser?.email );

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console. error(err);
    }
  };

  const signInWithgoogle = async () => {
    try {
      await signInWithPopup(auth,  googleProvider);
    } catch (err) {
      console. error(err);
    }
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console. error(err);
    }
  };

  return (
    <>
      <div className="login">
        <div className="inputGroup">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />  
        </div>
        <button onClick={signIn}> Sign in </button>
      </div>
       <button onClick={signInWithgoogle}>Sign in with Google</button>
       <button onClick={logoutHandler }>LogOut</button>
    </>
  );
};
