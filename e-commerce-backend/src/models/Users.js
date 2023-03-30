const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "ENTER the first name"]
    },
    lastname: {
        type: String,
        required: [true, "ENTER the last name"]
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        minimum: 0
    },
    address: {
        type: String,
        required: [true, "ENTER the address"]
    },
    rolerole: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "UserRole"
    }

})

module.exports = mongoose.model.Users || mongoose.model("Users", userSchema)