var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var productSchema = mongoose.Schema({
	prName:String,
	prCategory:String,
	prPrice:Number,
	prDetails:String,
	prImage:Buffer


});
const Product = mongoose.model("Product", productSchema);


module.exports = Product;


