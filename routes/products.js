var express = require("express");
var router = express.Router();
const multer = require("multer");
const Product = require("../models/product");


const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	
});

router.get("/", async function (req, res, next) {
	let products = await Product.find();
	res.render("products/list", { title: "Protiens In Our Stock", products });
});

router.get("/add" , async function (req, res, next) {
	res.render("products/add");
});

router.post("/add", 	upload.single("avatar"),async function (req, res, next) {
	

	let product = new Product(req.body);
	await product.save();
	res.redirect("/products");
});
router.get("/delete/:id", async function (req, res, next) {
	let product = await Product.findByIdAndDelete(req.params.id);
	if (!product) return res.status(404).send("The Product with the given ID was not found.");
	res.redirect("/products");
});


router.get("/:id/avatar", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product || !product.avatar) {
			throw new Error();
		}
		res.set("content-type", "image/png");
		res.send(product.avatar);
	} catch (error) {
		res.status(400).send();
	}
});

module.exports = router;
