module.exports.index = (req, res) => {
  res.render("admin/pages/accounts/index",{
          pageTitle: "Trang tài khoản quản trị",
      }
  )
}