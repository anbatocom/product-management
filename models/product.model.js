const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
    title: String,
    category_id: String,
    slug: { 
      type: String, 
      slug: "title", 
      unique: true
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    createdBy: String,
    createdAt: Date,
    deleted: {
      type: Boolean,
      default: false
    }
  });

const Product = mongoose.model(
    'Product',
    productSchema,
    'products' //tên Collection muốn trỏ vào
  );

module.exports = Product;