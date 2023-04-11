const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
      .connect(process.env.MONGODB_URL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((data) => {
        console.log(`mongod connected with server: ${data.connection.host}`);
      });
  };
  
  module.exports = connectDatabase;