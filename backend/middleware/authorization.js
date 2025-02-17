const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const authenticateToken = async(req,res,next)=>{
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if(token == null) return res.status(401).json({errorMessage : "No token found"});

    jwt.verify(token, process.env.JWT_SECRET,async (err,user)=>{
        if(err) return res.status(401).json({errorMessage: "Token expired"});

        req.user = await User.findById(user.id).select("-password");

        next();
    })
}

module.exports = {authenticateToken};