import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/signUp";
import { useAuthContext } from "./Hooks/useAuthContext";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const {user} = useAuthContext()
  return (
    <div>
      <Navbar />
      <Routes>
  <Route path="/" element={user && user.role === 'user' ? <Home /> : user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/user/login" />} />
  <Route path="/books/create" element={user && user.role === 'user' ? <CreateBook /> : <Navigate to="/user/login" />} />
  <Route path="/books/details/:id" element={user && user.role === 'user' ? <ShowBook /> : <Navigate to="/user/login" />} />
  <Route path="/books/edit/:id" element={user && user.role === 'user' ? <EditBook /> : <Navigate to="/user/login" />} />
  <Route path="/books/delete/:id" element={user && user.role === 'user' ? <DeleteBook /> : <Navigate to="/user/login" />} />
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/user/login" element={!user ? <Login /> : <Navigate to="/" />} />
  <Route path="/user/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
</Routes>

    </div>
      

  );
}

export default App;
