const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const cors = require("cors");
const path = require("path")
const lipaNaMpesaRoutes = require("./routes/LipaNaMpesa")
//good

app.use();
app.use('/api/v1',lipaNaMpesaRoutes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname,"uploads")));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});
app.get('/img/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, 'uploads', filename);

  fs.readFile(imagePath)
    .then((data) => {
      const ext = path.extname(filename).slice(1);
      const contentType = `image/${ext}`;

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data, 'binary');
    })
    .catch((error) => {
      console.error('Error reading the image file:', error);
      res.status(404).send('Image not found');
    });
});
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");
app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
