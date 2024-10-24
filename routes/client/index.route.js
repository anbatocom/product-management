const homeRoute = require("./home.route")
const productRoute = require("./product.route")
const cartRoute = require("./cart.route")
const chatRoute = require("./chat.route")
const orderRoute = require("./order.route")

const categoryMiddleware = require("../../middlewares/client/category.middleware")
const cartMiddleware = require("../../middlewares/client/cart.middleware")

module.exports.index = (app) => {
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.cart)
    
    app.use('/products/', productRoute)
    app.use('/cart/', cartRoute)
    app.use('/order/', orderRoute)
    app.use('/', homeRoute)
    app.use('/chat', chatRoute)
    
}