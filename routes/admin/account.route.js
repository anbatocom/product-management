const express = require("express");
const router = express.Router();
const multer = require('multer');

const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

const validate = require("../..//valitdates/admin/product.validate")

const controller = require("../../controllers/admin/account.controller")

router.get('/', controller.index)

router.get('/create', controller.create)

router.post(
  '/create',
  upload.single('avatar'),
  uploadCloud.uploadSingle, /* hàm trung gian, cần hàm next() để chạy controller tiếp theo */
  controller.createPOST
);









module.exports = router;