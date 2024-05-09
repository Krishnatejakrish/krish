import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null); // Changed from 'file' to 'image'
  const [description, setDescription] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = (event) => {
    const value = event.target.value === "true"; // Changed to compare with "yes"
    setBestSeller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage); // Changed from 'setFile' to 'setImage'
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");
      if (!loginToken || !firmId) {
        console.error("user not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image); // Changed from 'file' to 'image'
      category.forEach((value) => {
        formData.append("category", value);
      });

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        alert("product added successfully");
        console.log(data);

        setProductName('')
        setPrice('')
        setCategory([])
        setBestSeller(false)
        setImage(null)
        setDescription('')
      }
    } catch (error) {
      console.error(error);
      alert("failed to add product");
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h2>Add Product</h2>
        <label htmlFor="">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <label htmlFor="">Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label className="headinglabel">Category</label>
        <div className="inputsContainer">
          <div className="checkboxContainer">
            <label>Veg</label>
            <input
              type="checkbox"
              value="veg"
              checked={category.includes("veg")}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="checkboxContainer">
            <label>Non-veg</label>
            <input
              type="checkbox"
              value="non-veg"
              checked={category.includes("non-veg")}
              onChange={handleCategoryChange}
            />
          </div>
        </div>
        <label htmlFor="">Bestseller</label>
        <div className="inputsContainer">
          <div className="checkboxContainer">
            <label>Yes</label>
            <input
              type="radio"
              value="true"
              onChange={handleBestSeller}
              checked={bestSeller === true} // Added checked attribute
            />
          </div>
          <div className="checkboxContainer">
            <label>No</label>
            <input
              type="radio"
              value="false"
              onChange={handleBestSeller}
              checked={bestSeller === false} // Added checked attribute
            />
          </div>
        </div>
        <label htmlFor="">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label htmlFor="">Product Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
