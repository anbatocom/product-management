const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("ket noi thanh cong");
    } catch (error) {
        console.log("ket noi KHONG thanh cong");
        console.log(error);
    }
}