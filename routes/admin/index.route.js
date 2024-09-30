const dashboardRoute = require("./dashboard.route")
const productRoute = require("./product.route")
const productCategoryRoute = require("./product-category.route.js")
const systemConfig = require("../../config/system.js")
const roleRouter = require("./role.route")
const accountRouter = require("./account.route")
module.exports.index = (app) => {

  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute)
  app.use(`${PATH_ADMIN}/products`, productRoute)
  app.use(`${PATH_ADMIN}/product-category`, productCategoryRoute)
  app.use(`${PATH_ADMIN}/roles`, roleRouter)
  app.use(`${PATH_ADMIN}/accounts`, accountRouter)
}