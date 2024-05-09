import React from "react";

const Navbar = ({
  ShowLoginHandler,
  ShowRegisterHandler,
  showLogout,
  logoutHandler,
}) => {
  // console.log(ShowLoginHandler)
  const firmName = localStorage.getItem("FirmName");
  return (
    <div className="navSection">
      <div className="company">Vendor Dashboard</div>
      <div className="firmName">
        <h3 className="firmname">{firmName}</h3>
      </div>
      <div className="userAuth">
        {!showLogout ? (
          <>
            <button onClick={ShowLoginHandler}>Login</button>
            <button onClick={ShowRegisterHandler}>Register</button>
          </>
        ) : (
          <button onClick={logoutHandler}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
