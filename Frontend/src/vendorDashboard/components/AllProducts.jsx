import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem("firmId");

    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();

      setProducts(newProductsData.products);
      //   console.log(newProductsData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    productsHandler();
  }, []);

  const deleteProductById = async (productId) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this product?");
      if (confirmed) {
        const response = await fetch(`${API_URL}/product/${productId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setProducts(products.filter((product) => product._id !== productId));
          alert("Product deleted successfully");
        } else {
          alert("Failed to delete product. Server responded with status: " + response.status);
        }
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Please try again later.");
    }
  };
  

  return (
    <div>
      {!products ? (
        <p>No products added yet</p>
      ) : (
        <table className="productTable">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={() => deleteProductById(item._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
