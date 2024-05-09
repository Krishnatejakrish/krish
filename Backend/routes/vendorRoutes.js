const vendorController = require("../controllers/VendorController");


const express = require("express");
const router = express.Router();

// post
router.post("/register", vendorController.vendorRegister);
router.post ('/login',vendorController.vendorLogin)

// get
router.get('/all-vendors',vendorController.getAllVendors)
router.get('/single-vendor/:id',vendorController.getVendorById)
module.exports = router;
