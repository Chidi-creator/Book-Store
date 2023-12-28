import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useSnackbar } from "notistack";

const useLogin = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const {login, user} = useAuthContext()

    
    const loginUser = async (identifier, password) =>{
      setError(null)
        setLoading(true)
        const credentials = { username: identifier, email: identifier, password };
            const res = await fetch('https://fair-frock-pike.cyclic.app/user/login', {
                method: 'POST', 
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(credentials)
            })

            
            if (!res.ok) {
                const json = await res.json();
              setLoading(false);
              setError(json.error);
              console.log(json.error);
            }
            if (res.ok) {
                const json = await res.json();
              setLoading(false)
              enqueueSnackbar(`Welcome ${json.username}`, {
                variant: "success",
                autoHideDuration: 1500,
                disableWindowBlurListener: true
              });
                login(json); // Use the login function to set the user in the context
                setError(null);
                localStorage.setItem('user', JSON.stringify(json));
                console.log(user);
            
            }

    }

    return {loginUser, error, loading}
}
 
export default useLogin;