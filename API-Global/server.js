require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const morgan = require("morgan");
const bodyParser = require("body-parser");
const paypal = require('paypal-rest-sdk');

const connectDatabase = require("./db/Database");

//Paypal Config
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
})


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan('tiny'));
// app.disable('x-powered-by'); // less hackers know about our stack
// app.use(cors());
// app.use(cors({
//   origin: function (origin, callback) {
//     const allowedOrigins = ['https://64e7-2402-800-6294-cf45-c510-287c-d959-6b5a.ngrok-free.app', 'http://localhost:3000', 'http://localhost:5000'];
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));
app.use(cors({
    origin: "https://64e7-2402-800-6294-cf45-c510-287c-d959-6b5a.ngrok-free.app",
    // origin: "https://splendid-puppy-f9941c.netlify.app",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true
}))

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
  });

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/typeRouter'))
app.use('/api', require('./routes/imgRouter'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))
app.use('/api', require('./routes/feedbackRouter'))
app.use('/api', require('./routes/address/townRouter'))
app.use('/api', require('./routes/address/district'))
app.use('/api', require('./routes/address/province'))
app.use('/api', require('./routes/orderRouter'))
app.use("/api", require("./routes/paypalRouter"))
app.use("/api", require("./routes/bandRouter"))
app.use("/api", require("./routes/voucherRouter"))



// // Connect to mongodb
// const URI = process.env.MONGODB_URL
// mongoose.connect(URI, {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, err => {
//     if (err) throw err;
//     console.log('Connected to MongoDB')
// })
// Connect to mongodb
connectDatabase();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "API-Global/.env",
    });
}

// config để phục vụ cho frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
    });
  }

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "https://64e7-2402-800-6294-cf45-c510-287c-d959-6b5a.ngrok-free.app");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`shutting down the server for Unhandled promise rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})