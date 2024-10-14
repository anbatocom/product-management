const ProductCategory = require('../../models/product-category.model');
const Product = require('../../models/product.model')

module.exports.index = async (req, res) => {
  const products = await Product
    .find({
      status: "active",
      deleted: false
    })
    .sort({
      position: "desc"
    })

  for (const item of products) {
    item.priceNew = item.price * (100 - item.discountPercentage) / 100;
    item.priceNew = item.priceNew.toFixed(0);
  }

  res.render('client/pages/products/index.pug', {
    pageTitle: "Trang DSSP",
    products: products
  })
}

module.exports.detail = async (req, res) => {
  const slug = req.params.slug;

  const product = await Product.findOne({
    slug: slug,
    status: "active",
    deleted: false,
  })

  product.priceNew = product.price * (100 - product.discountPercentage) / 100;
  product.priceNew = product.priceNew.toFixed(0);

  res.render('client/pages/products/detail.pug', {
    pageTitle: product.title,
    product: product,
  })
}

module.exports.category = async (req, res) => {
  const slugCategory = req.params.slugCategory;

  const categoryData = await ProductCategory.findOne({
    slug: slugCategory,
    deleted: false,
    status: "active"
  })
  console.log(categoryData);

  const products = await Product.find({
    category_id: categoryData._id,
    deleted: false,
    status: "active",
  }).sort({
    position: "desc"
  })

  for (const product of products) {
    product.priceNew = product.price * (100 - product.discountPercentage) / 100;
    product.priceNew = product.priceNew.toFixed(0);
  }

  res.render('client/pages/products/index', {
    pageTitle: categoryData.title,
    products: products,
  })

}
