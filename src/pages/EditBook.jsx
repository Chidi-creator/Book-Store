import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import { useAuthContext } from "../Hooks/useAuthContext";
const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  useEffect(() => {
    const getData = async () => {
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
        setTitle(json.title);
        setAuthor(json.author);
        setPublishYear(json.publishYear);
      }
      console.log(title)
    };
    getData();
  }, []);

  const handleEditBook = async (e) => {
    e.preventDefault();

    const book = { title, author, publishYear };

    setLoading(true);
    const res = await fetch(`https://fair-frock-pike.cyclic.app/books/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      console.log(json.error);
      enqueueSnackbar(json.error, { variant: "error", autoHideDuration: 3000 });
      setLoading(false);
    }
    if (res.ok) {
      enqueueSnackbar(json.message, {
        variant: "success",
        autoHideDuration: 1800,
      disableWindowBlurListener: true
      });
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col md:w-[600px] lg:w-[800px] mx-auto border-2 border-sky-400 rounded-xl p-4">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>

          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-300 m-8 text-white text-xl"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
