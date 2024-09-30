const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
  const records = await Role.find({
    deleted: false,
  });

  res.render("admin/pages/roles/index", {
    pageTitle: "Trang nhóm quyền",
    records: records,
  }
  );
}

module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Trang thêm nhóm quyền",
  })
}

module.exports.createPOST = async (req, res) => {
  const role = new Role(req.body);
  await role.save();

  res.redirect(`/${systemConfig.prefixAdmin}/roles`)
  
}