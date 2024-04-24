import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBook(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  },[id]);
  return (
    // <div className="p-4">
    //   <BackButton />
    //   <h1 className="text-3xl my-4">SHOW BOOK</h1>

    //   {loading ? (
    //     <Spinner />
    //   ) : (
    //     <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4">
    //       <div className="my-4">
    //         <span className="text-xl mr-4 text-gray-500">ID</span>
    //         <span>{book._id}</span>
    //       </div>
    //       <div className="my-4">
    //         <span className="text-xl mr-4 text-gray-500">TITLE</span>
    //         <span>{book.title}</span>
    //       </div>
    //       <div className="my-4">
    //         <span className="text-xl mr-4 text-gray-500">AUTHOR</span>
    //         <span>{book.author}</span>
    //       </div>
    //       <div className="my-4">
    //         <span className="text-xl mr-4 text-gray-500">PUBLISH YEAR</span>
    //         <span>{book.publishYear}</span>
    //       </div>
    //       <div className="my-4">
    //         <span className="text-xl mr-4 text-gray-500">CREATE TIME</span>
    //         <span>{new Date(book.createdAt).toString()}</span>
    //       </div>
    //       <div className="my-4">
    //         <span className="text-xl mr-4 text-gray-500">LAST UPDATE TIME</span>
    //         <span>{new Date(book.updatedAt).toString()}</span>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="flex justify-center items-center h-screen">
  <div className="p-4">
    <BackButton />
    <h1 className="text-3xl my-4">SHOW BOOK</h1>

    {loading ? (
      <Spinner />
    ) : (
      <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4">
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">ID</span>
          <span>{book._id}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">TITLE</span>
          <span>{book.title}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">AUTHOR</span>
          <span>{book.author}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">PUBLISH YEAR</span>
          <span>{book.publishYear}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">CREATE TIME</span>
          <span>{new Date(book.createdAt).toString()}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">LAST UPDATE TIME</span>
          <span>{new Date(book.updatedAt).toString()}</span>
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default ShowBook;
