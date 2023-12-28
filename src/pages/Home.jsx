/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import BooksTable from "../components/Home/BooksTable";
import BooksCard from "../components/Home/BooksCard";
import { useAuthContext } from "../Hooks/useAuthContext";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoadiing] = useState(true);
  const [showType, setShowType] = useState("table");
  const { user } = useAuthContext();
  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch("https://fair-frock-pike.cyclic.app/books/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await res.json();
      if (!res.ok) {
        console.log(json.error);
        setLoadiing(false);
      }

      if (res.ok) {
        console.log(json);
        setBooks(json);
        setLoadiing(false);
      }
    };
    getBooks();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="p-4  bg-gray-50 ">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300  hover:bg-sky-600 px-4 rounded-lg py-1"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>

        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-500 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
