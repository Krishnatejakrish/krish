import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import Addfirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import Welcome from "../components/Welcome";
import AllProducts from "../components/AllProducts";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showFirmTitle, setShowFirmTItle] = useState(true);
  const [showWelcometext, setshowWelcomeText] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setShowLogout(true);
      setshowWelcomeText(false);
    }
  });

  useEffect(() => {
    const FirmName = localStorage.getItem("FirmName");
    if (FirmName) {
      setShowFirmTItle(false);
    }
  }, []);

  const logoutHandler = () => {
    const confirmed = window.confirm("Are you sure, you want to logout?");
    if (!confirmed) {
      return;
    }
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("FirmName");
    setShowLogout(false);
    setShowFirmTItle(true);
    setshowWelcomeText(true);
  };

  const ShowLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setshowWelcomeText(false);
  };
  const ShowRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setshowWelcomeText(false);
  };
  const ShowFirmHandler = () => {
    if (showLogout) {
      setShowFirm(true);
      setShowRegister(false);
      setShowLogin(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setshowWelcomeText(true);
    } else {
      alert("please login to add firm details");
      setShowLogin(true);
      setShowRegister(false);
      setshowWelcomeText(false);
    }
  };
  const ShowProductHandler = () => {
    if (showLogout) {
      setShowProduct(true);
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setshowWelcomeText(false);
    } else {
      alert("please login to add product details");
      setShowLogin(true);
      setShowRegister(false);
      setshowWelcomeText(false);
    }
  };
  const ShowWelcomeHandler = () => {
    setShowWelcome(true);
    setShowProduct(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowAllProducts(false);
    setshowWelcomeText(false);
  };

  const showAllProductsHandler = () => {
    if (showLogout) {
      setShowAllProducts(true);
      setShowWelcome(false);
      setShowProduct(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setshowWelcomeText(false);
    } else {
      alert("please login to see your product details");
      setShowLogin(true);
      setShowRegister(false);
      setshowWelcomeText(false);
    }
  };

  return (
    <>
      <section className="landingsection">
        <Navbar
          ShowLoginHandler={ShowLoginHandler}
          ShowRegisterHandler={ShowRegisterHandler}
          showLogout={showLogout}
          logoutHandler={logoutHandler}
          // showWelcometext={showWelcometext}
        />

        <div className="collectionSection">
          <Sidebar
            ShowFirmHandler={ShowFirmHandler}
            ShowProductHandler={ShowProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
          />
          {showWelcometext && !showLogout && (
            <div className="wellCome">
              <h2>welcome to vendor</h2>
            </div>
          )}
          {showLogin && <Login ShowWelcomeHandler={ShowWelcomeHandler} />}
          {showRegister && <Register ShowLoginHandler={ShowLoginHandler} />}
          {showFirm && showLogout && <Addfirm />}
          {showProduct && showLogout && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogout && <AllProducts />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
