/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import UserBooksModal from '../components/UserBooksModal';
import { FaUser, FaBook } from 'react-icons/fa';
import { useAuthContext } from "../Hooks/useAuthContext";

const AdminDashboard = () => {
    const {user} = useAuthContext()
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://fair-frock-pike.cyclic.app/user/", {
            headers: {
            Authorization: `Bearer ${user.token}`
            }
        });
        const json = await res.json();

        if (res.ok) {
          setUsers(json);
        } else {
          console.error(json.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    const fetchBooks = async () => {
      try {
        const res = await fetch('https://fair-frock-pike.cyclic.app/books/admin/all');
        const json = await res.json();

        if (res.ok) {
          setBooks(json);
        } else {
          console.error(json.error);
        }
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    fetchUsers();
    fetchBooks();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-semibold mb-8 text-center">Admin Dashboard</h1>

      {/* Users Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Registered Users</h2>
        <div className="grid grid-cols-2 gap-6">
          {users.map((user) => (
            <div key={user._id} className="border p-6 rounded transition-transform transform hover:scale-105 cursor-pointer" onClick={() => openModal(user)}>
              <FaUser className="text-4xl mb-2 mx-auto" />
              <h3 className="text-xl font-semibold text-center">{user.username}</h3>
              <p className="text-sm text-center">Email: {user.email}</p>
              <p className="text-sm text-center">Registration Date: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Books Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Users' Books</h2>
        <div className="grid grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book._id} className="border p-6 rounded transition-transform transform hover:scale-105">
              <FaBook className="text-4xl mb-2 mx-auto" />
              <h3 className="text-xl font-semibold text-center">{book.title}</h3>
              <p className="text-sm text-center">Author: {book.author}</p>
              <p className="text-sm text-center">Publish Year: {book.publishYear}</p>
            </div>
          ))}
        </div>
      </section>

      {/* User Books Modal */}
      {isModalOpen && <UserBooksModal isOpen={isModalOpen} onClose={closeModal} user={selectedUser} books={books} />}
    </div>
  );
};

export default AdminDashboard;
