const User = require("../../models/user.model");
module.exports.infoUser = async (req, res, next) => {
  if(req.cookies.tokenUser){
    const user = await User.findOne({
      token: req.cookies.tokenUser,
      deleted: false,
      status: "active"
    });

    if(user){
      res.locals.user = user; //ở đây trả ra giao diện giá trị của user để dùng cho file pug
    }
  }
  next();
}