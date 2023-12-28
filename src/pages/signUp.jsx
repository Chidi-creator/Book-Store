import { useState, useEffect } from "react";
import useSignup from "../Hooks/useSignup";
import { useAuthContext } from "../Hooks/useAuthContext";


const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user} = useAuthContext()

const { signup, error, loading} = useSignup()


const handleClick = async (e) =>{

    e.preventDefault()
    await signup(username, email, password)
    
}
useEffect(() => {
    console.log(user);
  }, [user]);


    return ( <div>
    
         <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) =>setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>setPassword(e.target.value) }
            />
          </div>
          {error && <p className="text-red-500 mt-4 mb-2">{error}</p>}
          {loading && <p className="text-red-500 mt-4 mb-2">loading...</p>}
          <button
            
            className="bg-blue-500 text-white p-2 rounded-md w-full"
            onClick={handleClick}
            disabled={loading}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </div> );
}
 
export default Signup;