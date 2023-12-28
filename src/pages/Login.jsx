import { useState, useEffect } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { Link } from "react-router-dom";
import useLogin from "../Hooks/useLogin";
const Login = () => {
  const { loginUser, error, loading } = useLogin();
  const [identifiier, setIdentifier] = useState();
  const [password, setPassword] = useState();
  const { user } = useAuthContext();

  const handleClick = async (e) => {
    e.preventDefault();
    await loginUser(identifiier, password);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form>
          {user && user.username}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username/Email
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your username or email"
              value={identifiier}
              onChange={(e) => setIdentifier(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mt-4 mb-2">{error}</p>}
          {loading && <p className="text-red-500 mt-4 mb-2">loading...</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full"
            onClick={handleClick}
            disabled={loading}
          >
            Login
          </button>
        </form>
         {/* "Don't have an account? Sign up" section */}
         <p className="text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/user/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default Login;
