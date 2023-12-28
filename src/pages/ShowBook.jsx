import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useAuthContext } from "../Hooks/useAuthContext";
import { formatDistanceToNow } from 'date-fns'

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const {user} = useAuthContext()

  useEffect(() => {
    const getBook = async () => {
      const res = await fetch(`https://fair-frock-pike.cyclic.app/books/details/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const json = await res.json();
      if (!res.ok) {
        setLoading(false);
        console.log(json.error);
      }
      if (res.ok) {
        setLoading(false);
        setBook(json);
        console.log(json);
      }
    };
    getBook();
  }, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : book ?  ( 
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
            <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Publish Year</span>
                <span>{ book.publishYear }</span>
            </div>
            <div className="my-4">
                <span className = 'text-xl mr-4 text-gray-500'>Create Time</span>
                <span>{formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}</span>
            </div>
          
          </div>
        </div>
      ): <p>Book not found</p>}
    </div>
  );
  
};

export default ShowBook;
