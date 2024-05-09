const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose')
const vendorRoutes = require('./routes/vendorRoutes')
const bodyParser = require('body-parser')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const path = require('path')
const cors = require('cors')
const PORT = 4000;
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Connected to database ')
})
.catch((error)=>{
    console.log(error)
})

app.use(bodyParser.json())

// Allow CORS for specific origin (replace http://localhost:5173 with your frontend URL)
const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))

app.use("/home", (req, res) => {
  res.send("<h1>Hello dear Krishna</h1>");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
