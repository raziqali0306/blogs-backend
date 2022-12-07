const User = require("../models/User.model");
const jwt = require('jsonwebtoken');
const { hash, verify } = require('../lib/argon2')

const register = async (req, res) => {
    const { username, password, email } = req.body;
    
    const hashedPass = await hash(password);
    const user = new User({ username, password:hashedPass, email });

    user.save()
        .then((user) => {
            res.status(200).json({
                message: "success",
                data: user
            })
        })
        .catch((err) => {
            res.status(500).json("failed");
        })
}
    
const login = (req, res) => {
    // TODO
    const { email, username, password } = req.body;
    User.findOne({ $or: [{ email }, { username }] }, async (err, data) => {
        if (err) {
            res.status(500).json("failed")
        }
        const { username, email } = data;
        if (await verify(data.password, password)) {
            let token = jwt.sign({ username, email }, process.env.JWT_SECRETE_KEY);
            res.status(200).json({
                message: "success",
                data: {...data._doc, access_token: token}
            })
        }
        else {
            res.status(401).json({
                message: "Incorrect Credentials!"
            })
        }

    })
}

module.exports = {
    register,
    login
}