import React from 'react'

const Sidebar = ({ShowFirmHandler,ShowProductHandler,showAllProductsHandler,showFirmTitle}) => {
  return (
   
      <div className="sidebarSection">
        <ul>
          {showFirmTitle? (<li onClick={ShowFirmHandler}>Add Firm</li>):("")}
          
          <li onClick={ShowProductHandler}>Add Product</li>
          <li onClick={showAllProductsHandler}>All products</li>
          <li>User Detials</li>
        </ul>
      </div>
   
  )
}

export default Sidebar
