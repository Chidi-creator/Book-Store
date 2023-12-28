import {  useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
  const { login } = useAuthContext();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const signup = async (username, email, password) => {
    setError(null)
    setLoading(true);

    const userParameters = { username, email, password };

    const res = await fetch("https://fair-frock-pike.cyclic.app/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userParameters),
    });
    

    if (!res.ok) {
        const json = await res.json();
      setLoading(false);
      setError(json.error);
      console.log(json.error);
    }
    if (res.ok) {
      setLoading(false);
      const json = await res.json();
        login(json); // Use the login function to set the user in the context
        setError(null);
        
        localStorage.setItem('user', JSON.stringify(json));
        console.log(json);

      
    }
  };

 

  return { signup, error, loading };
};

export default useSignup;
