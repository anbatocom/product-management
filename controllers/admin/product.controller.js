const Product = require("../../models/product.model")
const systemConfig = require("../../config/system")
const ProductCategory = require("../../models/product-category.model");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };
  // Lọc theo trạng thái
  if (req.query.status) {
    find.status = req.query.status
  }
  // End Lọc theo trạng thái

  //Tìm kiếm
  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i") // "i" không phân biệt chữ hoa chữ thường, RegExp là một dạng tìm kiếm nâng cao 
    find.title = regex;
  }
  //End tìm kiếm

  //Phân trang
  let limitItems = 4;
  let page = 1;

  if (req.query.page) {
    page = parseInt(req.query.page);
  }

  if (req.query.limit) {
    limitItems = parseInt(req.query.limit);
  }

  const skip = (page - 1) * limitItems;

  const totalProducts = await Product.countDocuments(find);//countDocuments(): hàm built-in đếm số lượng  
  const totalPage = Math.ceil(totalProducts / limitItems);

  //End phân trang

  // Sắp xếp
  const sort = {};
  if(req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;

    sort[sortKey] = sortValue;
  } else {
    sort["position"] = "desc";
  }
  // End Sắp xếp

  const products = await Product
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort(sort)

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    totalPage: totalPage,
    currentPage: page,
    limitItems: limitItems,
  });
}

module.exports.changeStatus = async (req, res) => { //req là 1 object chứa các thông tin mà bên front-end gửi về cho back-end, res là những thông tin mà bên back-end trả về front-end
  // console.log(req.body.id); // cần cài lib body-parser của npm mới có thể dùng được req
  // giữ liệu lấy từ front-end sẽ được lib body-parser tự động chuyển từ json -> js
  // console.log(req.body.status);

  //dùng await để chờ cập nhật
  await Product.updateOne({
    _id: req.body.id
  }, {
    status: req.body.status
  });

  req.flash('success', 'Đổi trạng thái thành công')

  res.json({
    code: "success",
  });
}

module.exports.changeMulti = async (req, res) => {

  // console.log(req.body); // cần cài lib body-parser của npm mới có thể dùng được req
  // giữ liệu lấy từ front-end sẽ được lib body-parser tự động chuyển từ json -> js

  switch (req.body.status) {
    case 'active':
    case 'inactive':
      await Product.updateMany({
        _id: req.body.ids
      }, {
        status: req.body.status
      });
      req.flash('success', 'Đổi trạng thái thành công')
      res.json({
        code: "success",

      });
      break;

    case 'delete':
      await Product.updateMany({
        _id: req.body.ids
      }, {
        deleted: true
      });
      req.flash('success', 'Xóa thành công')
      res.json({
        code: "success",

      });

      break;
    default:
      res.json({
        code: "error",
        message: "Trạng thái không hợp lệ"

      });
      break;
  }
}

module.exports.permanentlyDelete = async (req, res) => {
  await Product.deleteOne({
    _id: req.body.id
  });

  req.flash('success', 'Xóa vĩnh viễn thành công')

  res.json({
    code: "success",

  });
}

module.exports.changePosition = async (req, res) => {
  await Product.updateOne({
    _id: req.body.id
  }, {
    position: req.body.position
  });
  req.flash('success', 'Đổi vị trí thành công')
  res.json({
    code: "success",

  });
}

module.exports.create = async (req, res) => {
  const list_category = await ProductCategory.find({
    deleted: false
  });

  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm mới sản phẩm",
    list_category: list_category
  });
}

module.exports.createPOST = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countRecord = await Product.countDocuments();
    req.body.position = countRecord + 1;
  }

  /* if (req.file) { 
    req.body.thumbnail = `/uploads/${req.file.fileName}`;
  } *NOTE: đây là đoạn code lưu đường link file ảnh dưới local, do up ảnh lên cloudinary nên đoạn code này không cần nữa */
  
  const record = new Product(req.body);
  await record.save();

  res.redirect(`/${systemConfig.prefixAdmin}/products/`);
}

module.exports.edit = async (req, res) => {

  const id = req.params.id;

  const product = await Product.findOne({
    _id: id,
    deleted: false,

  });

  res.render("admin/pages/products/edit.pug", {
    pageTitle: "Chỉnh sửa sản phẩm",
    product: product
  });
}

module.exports.editPATCH = async (req, res) => {

  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countRecord = await Product.countDocuments();
    req.body.position = countRecord + 1;
  }

  // if (req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.fileName}`;
  // }

  // console.log(id);
  // console.log(req.body);


  await Product.updateOne({
    _id: id,
    deleted: false
  }, req.body);

  req.flash("success", "Cập nhật thành công");
  res.redirect("back");

}

module.exports.recycleBIN = async (req, res) => {
  const find = {
    deleted: true
  };
  // Lọc theo trạng thái
  if (req.query.status) {
    find.status = req.query.status
  }
  // End Lọc theo trạng thái

  //Tìm kiếm
  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i") // "i" không phân biệt chữ hoa chữ thường, RegExp là một dạng tìm kiếm nâng cao 
    find.title = regex;
  }
  //End tìm kiếm

  //Phân trang
  let limitItems = 4;
  let page = 1;

  if (req.query.page) {
    page = parseInt(req.query.page);
  }

  if (req.query.limit) {
    limitItems = parseInt(req.query.limit);
  }

  const skip = (page - 1) * limitItems;

  const totalProducts = await Product.countDocuments(find);//countDocuments(): hàm built-in đếm số lượng  
  const totalPage = Math.ceil(totalProducts / limitItems);

  //End phân trang

  const products = await Product
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort({
      position: "desc"
    })

  res.render("admin/pages/products/recycle-bin", {
    pageTitle: "Thùng rác",
    products: products,
    totalPage: totalPage,
    currentPage: page,
  });
}

module.exports.temporaryDelete = async (req, res) => {
  await Product.updateOne({
    _id: req.body.id
  }, {
    deleted: req.body.deleted
  });

  req.flash('success', 'Đổi trạng thái thành công')

  res.json({
    code: "success",
  });
}

module.exports.restore = async (req, res) => {
  await Product.updateOne({
    _id: req.body.id
  }, {
    deleted: req.body.deleted
  });

  req.flash('success', 'Khôi phục thành công')

  res.json({
    code: "success",
  });
}

module.exports.detail = async (req, res) => {

  const id = req.params.id;

  const product = await Product.findOne({
    _id: id,
    deleted: false,

  });

  res.render("admin/pages/products/detail.pug", {
    pageTitle: "Chi tiết sản phẩm",
    product: product
  });
}