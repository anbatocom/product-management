const Cart = require("../../models/cart.model");
module.exports.addPOST = async (req, res) => {
  const cartID = req.cookies.cartId

  const cart = await Cart.findOne({
    _id: cartID
  })
  
  const products = cart.products;

  const existProduct = products.find((item => item.productID == req.params.id))

  if(existProduct) {
    existProduct.quantity = existProduct.quantity + parseInt(req.body.quantity)

  } else {
    const product = {
      productID: req.params.id,
      quantity: parseInt(req.body.quantity)
    }
    products.push(product); // them vao mang products 
  }

  
  await Cart.updateOne({
    _id: cartID
  },{
    products: products
  })
  
  req.flash("success", "Đã thêm sản phẩm vào giỏ hàng")
  res.redirect("back")
}