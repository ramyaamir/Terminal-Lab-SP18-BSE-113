var createError = require("http-errors");
var express = require("express");
var path = require("path");

var logger = require("morgan");

var mongoose = require("mongoose");
var productRouter = require("./routes/products");
var indexrouter = require("./routes/index")


var app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexrouter);
app.use("/products", productRouter);


app.use(function (req, res, next) {
	next(createError(404));
});


app.use(function (err, req, res, next) {
	
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	
	res.status(err.status || 500);
	res.render("error");
});
mongoose
	.connect("mongodb+srv://ramyaamir261:<password>@ramyacluster.my8fk.mongodb.net/test", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to Mongo...."))
	.catch((error) => console.log(error.message));
module.exports = app;

