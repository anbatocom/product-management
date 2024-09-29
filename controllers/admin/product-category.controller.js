const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system")

module.exports.index = (req, res) => {
  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh sách danh mục sản phẩm"
  });
}

module.exports.create = async (req, res) => {
  const list_category = await ProductCategory.find({
    deleted: false
  });
  // console.log(list_category);
  
  res.render("admin/pages/product-category/create", {
    pageTitle: "Thêm danh mục sản phẩm",
    categoryList: list_category,
  });
}

module.exports.createPOST = async (req, res) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countRecord = await ProductCategory.countDocuments();
    req.body.position = countRecord + 1;
  }
  const record = new ProductCategory(req.body);
  await record.save();
  
  res.redirect(`/${systemConfig.prefixAdmin}/product-category/`);
}