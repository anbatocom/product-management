const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const md5 = require('md5');

const generateHelper = require("../../helpers/generate.helper")
const systemConfig = require("../../config/system")

module.exports.index = (req, res) => {
  res.render("admin/pages/accounts/index",{
          pageTitle: "Trang tài khoản quản trị",
      }
  )
}

module.exports.create = async (req, res) => {
  
  const roles = await Role.find({
    deleted: false,
  })
  res.render("admin/pages/accounts/create",{
          pageTitle: "Tạo tài khoản quản trị",
          roles: roles,
      }
  )
}

module.exports.createPOST = async (req, res) => {
  req.body.password = md5(req.body.password);
  req.body.token = generateHelper.generateRandomString(30);
  console.log(req.body);
  
  const account = new Account(req.body);
  await account.save();

  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

