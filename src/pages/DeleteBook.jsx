import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useState } from "react";
import {useSnackbar} from 'notistack'
import { useAuthContext } from "../Hooks/useAuthContext";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar()
  const {user} = useAuthContext()

  const handleDeleteBook = async () => {
    setLoading(true);
    const res = await fetch(`https://fair-frock-pike.cyclic.app/books/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    const json = await res.json();

    if (!res.ok) {
      setLoading(false);
      console.log(json.error);
      enqueueSnackbar(json.error, {variant: 'error',
      })
    }
    if (res.ok) {
      setLoading(false);
      enqueueSnackbar(json.message, {variant: 'success',
      autoHideDuration: 1800,
      disableWindowBlurListener: true
    })
      navigate("/");
      console.log(json.message);
    }
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">DELETE BOOK</h1>

      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px]  p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white"
          onClick={handleDeleteBook}
        >
          Yes, DELETE IT
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
