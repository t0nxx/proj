const Joi = require("joi");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv/config");
const mongoose = require("mongoose");

// mongoose.connect(process.env.DATA_BASE)
mongoose
  .connect(process.env.DATA_BASE)
  .then(() => console.log("connected to db"))
  .catch(err => console.error("error", err));

const ItemsRoute = require("./routes/items");
const InvoicesRoute = require("./routes/invoices");
const UsersRoute = require("./routes/users");
const UsersTypeRoute = require("./routes/userstypes");
const ProductTypeRoute = require("./routes/prodtypes");
const Quotations = require("./routes/quotation");
const AuthRoute = require("./routes/auth");
const LoginRoute = require("./routes/login");

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/assets"));
app.set("view engine", "ejs");
app.use("/items", ItemsRoute);
app.use("/invoices", InvoicesRoute);
app.use("/users", UsersRoute);
app.use("/userstypes", UsersTypeRoute);
app.use("/prodtypes", ProductTypeRoute);
app.use("/quotations", Quotations);
app.use("/auth", AuthRoute);
app.use("/login", LoginRoute);

app.listen(3000, () => console.log("running"));
