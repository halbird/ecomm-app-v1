const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const cookieKey = process.env.COOKIEKEY;

const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const adminProductsRouter = require("./routes/admin/products");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({keys: [cookieKey]}));

app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);



// tell application to start listening for incoming network requests
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
