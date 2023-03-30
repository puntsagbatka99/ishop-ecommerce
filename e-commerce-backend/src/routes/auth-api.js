import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const authApi = express.Router()
const Users = require("../models/Users")
const UserRole = require("../models/UserRole")

authApi.post("/register", async (request, response) => {
    const data = request.body
    console.log(request.body)
    if (data) {
        const oldUser = await Users.findOne({ email: data.email })

        if (oldUser) {
            return response.json({
                message: "Хэрэглэгч байна",
            })
        }

            let hashedPassword = await bcrypt.hash(data.password, 10)
            data.password = hashedPassword
            try{
                const user = await Users.create(data)
                const result = await user.populate("userrole")
                response.status(202).json({
                    message: "Хэрэглэгч амжилттай үүслээ",
                    data: result
                })
            } catch ( error ){
                response.status(505).json({
                    success: false,
                    error: error
                })
            }

    } else {
        return response.json({ error: "Input field is empty!" })
    }
})

authApi.post("/login", async (request, response) => {
    try {
        const { email, password } = request.body
        if (!(email && password)) {
            return response.status(400).json({ message: "Utguudiig buren oruul" })
        } else {
            const user = await Users.findOne({ email })

            const isMatch = await bcrypt.compare(password, user?.password)

            if (user && isMatch) {
                const jwtBody = {
                    user_id: user._id,
                    email
                }
                const token = jwt.sign(jwtBody, "MySuperDuperPrivateKey", { expiresIn: "24h" })

                response.status(200).json({
                    success: true,
                    token: token,
                    status: "Зөв хийгээч нохой минь"
                })
                return;
            } else {
                return response.status(400).json({
                    success: false,
                    status: "Нууц үг эсвэл нэр хоорондоо таарахгүй байна."
                })
            }
        }

    } catch (error) {
        response.status(555).json({
            data: "failed",
            error: error
        })
    }
})

authApi.post("/role/create", async (req, res) =>{
    const {name} = req.body

    const result = await UserRole.create({ name })
    
    res.status(200).json({
        data: result
    })
})

authApi.get("/role/list", async (req, res) => {
    const result = await UserRole.find({})
    res.status(200).json({
        data: result
    })
})

module.exports = authApi