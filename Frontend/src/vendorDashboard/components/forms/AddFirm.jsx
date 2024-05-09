import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Addfirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };
  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the token from local storage
      const loginToken = localStorage.getItem("loginToken");
      console.log("loginToken:", loginToken);
      if (!loginToken) {
        console.error("user not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", file);
      category.forEach((value) => {
        formData.append("category", value);
      });
      region.forEach((value) => {
        formData.append("region", value);
      });

      const response = await fetch(`http://localhost:4000/firm/add-firm`, {
        method: "POST",
        headers: {
          // Include the token in the Authorization header
          Authorization: `Bearer ${loginToken}`, // Corrected the format of the token
        },
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert("firm added successfully");
        console.log("firm added succesfully");
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      } else if (data.message === "vendor can have only one firm") {
        alert("Firm exists, vendor can add only one firm");
        console.log(' vendor can add only one firm')
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      }
       else {
        alert("Failed to add firm");
      }

      const firmId = data.firmId;
      localStorage.setItem("firmId", firmId);
    } catch (error) {
      console.error("failed to add-firm", error);
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h2>Add Firm</h2>
        <label htmlFor="">Firm Name</label>
        <input
          type="text"
          name="firmname"
          value={firmName}
          onChange={(e) => {
            setFirmName(e.target.value);
          }}
        />
        <label htmlFor="">Area</label>
        <input
          type="text"
          name="area"
          value={area}
          onChange={(e) => {
            setArea(e.target.value);
          }}
        />

        <div className="checkInp">
          <label className="headinglabel">Category</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>veg</label>
              <input
                type="checkbox"
                checked={category.includes("veg")}
                value="veg"
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checkboxContainer">
              <label>Non-veg</label>
              <input
                type="checkbox"
                checked={category.includes("non-veg")}
                value="non-veg"
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>

        <div className="checkInp">
          <label className="headinglabel">Region</label>
          <div className="inputsContainer">
            <div className="regioncheckboxContainer">
              <label>South Indian</label>
              <input
                type="checkbox"
                checked={region.includes("south-indian")}
                value="south-indian"
                onChange={handleRegionChange}
              />
            </div>
            <div className="regioncheckboxContainer">
              <label>North Indian</label>
              <input
                type="checkbox"
                checked={region.includes("north-indian")}
                value="north-indian"
                onChange={handleRegionChange}
              />
            </div>
            <div className="regioncheckboxContainer">
              <label>Chinese</label>
              <input
                type="checkbox"
                checked={region.includes("chinese")}
                value="chinese"
                onChange={handleRegionChange}
              />
            </div>
            <div className="regioncheckboxContainer">
              <label>Bakery</label>
              <input
                type="checkbox"
                checked={region.includes("bakery")}
                value="bakery"
                onChange={handleRegionChange}
              />
            </div>
          </div>
        </div>
        <label htmlFor="">Offer</label>
        <input
          type="text"
          name="offer"
          value={offer}
          onChange={(e) => {
            setOffer(e.target.value);
          }}
        />
        <label htmlFor="">Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Addfirm;
