const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.WhatIsYourName;
const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Email already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new vendor document
    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new vendor document
    await newVendor.save();

    // Respond with success message
    res.status(201).json({ message: "Vendor registered successfully" });
    console.log("Vendor registered successfully");
  } catch (error) {
    // Handle errors
    console.error("Error registering vendor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey, {
      expiresIn: "1h",
    });

    const vendorId = vendor._id

    res.status(200).json({ sucess: "login sucessfull", token ,vendorId});
    console.log(email, "  this is your token: ", token);
    console.log(vendorId)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.json({ vendors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const getVendorById = async (req, res) => {
  const vendorId = req.params.id;

  try {
    const vendor = await Vendor.findById(vendorId).populate('firm');
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    
      const vendorFirmId = vendor.firm[0]._id;
      res.status(200).json({ vendorId, vendorFirmId,vendor });
      console.log("Vendor firm ID:", vendorFirmId);
    
  } catch (error) {
    console.error("Error fetching vendor by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { vendorRegister, vendorLogin,getAllVendors,getVendorById };
