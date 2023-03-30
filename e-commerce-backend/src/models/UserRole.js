const mongoose = require("mongoose")
//Admin хэрэглэч бол бүх эрхтэй хэрэглэгч байна.
//Customer хэрэглэгч бол Админ Панел дотор орж чадахгүй хэрэглэгч байна.
//User хэрэглэгч нь зарим нэг Админ Панел дээр устгах, өөрчлөх эсвэл үүсгэх эрхгүй хэрэглэгч байна
const UserRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter the Role name"],
        unique: true
    }
})

const UserRole = mongoose.model("UserRole", UserRoleSchema)
module.exports = UserRole