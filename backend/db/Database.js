const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
  await  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    });
  } catch (error) {
   return console.log(error.message);
  }
};

module.exports = connectDatabase;
