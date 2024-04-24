import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { PiBookOpenTextLight } from "react-icons/pi";
const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl  text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <h1 className="w-fit px-4 py-1 bg-red-300 rounded-lg ">
          {book.publishYear}
        </h1>
        <h3 className="my-2 text-gray-500">{book._id}</h3>

        <div className="flex justify-start items-center gap-x-2 ">
          <PiBookOpenTextLight className="text-red-300  text-2xl " />
          <h2 className=" my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.author}</h2>{" "}
          {/* Render the author's name directly */}
        </div>

        <p className="mt-4"> anything you want show</p>
        <p className="my-2"> 
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore omnis deleniti maiores vel dicta! Earum nihil quae voluptatem quasi, id dolorum! Autem similique ab voluptate quaerat excepturi nulla illo ullam?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, expedita.
        <br /> <br />
        
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo pariatur nam reprehenderit architecto minus non perferendis expedita soluta? Esse repudiandae in autem! Sequi commodi fuga 
        </p>
      </div>
    </div>
  );
};

export default BookModal;
