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
        .catch((error) => {
            res.status(500).json({
                message: "failed",
                error
            });
        })
}
    
const login = (req, res) => {
    // TODO
    const { email, username, password } = req.body;
    User.findOne({ $or: [{ email }, { username }] }, async (error, data) => {
        if (error) {
            res.status(500).json({
                message: "failed",
                error
            })
        }
        const { username, email, _id } = data;
        if (await verify(data.password, password)) {
            let token = jwt.sign({ username, email, author: _id }, process.env.JWT_SECRETE_KEY);
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