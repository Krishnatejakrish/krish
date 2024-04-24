import React from "react";

// import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
// import { useSnackbar } from "notistack";
import { useSnackbar } from "notistack";


const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const { id } = useParams();
  // const {enqueueSnackBar}= useSnackbar();
  const { enqueueSnackbar } = useSnackbar();


  const handDeleteBook = () => {
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((res) => {
        // alert("Book deleted successfully");
        setLoading(false);
        enqueueSnackbar("book deleted succesfully", { variant: "success" });
        Navigate("/");
      })
      .catch((error) => {
        alert(
          "An error occurred while deleting the book. Please check the console."
        );
        console.error(error);
        enqueueSnackbar("error", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text=3xl my-4">DELETE BOOK</h1>
      {loading ? <Spinner /> : " "}

      <div className=" flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px ] p-8 mx-auto">
        <h3 className=" text-2xl ">
          Are you sure you want to delete this book
        </h3>

        <button
          className="bg-red-600 p-4 text-white m-8 w-full sm:w-auto flex justify-center"
          onClick={handDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
