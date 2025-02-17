const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { validateRole } = require("./exports/validateRole");


//Register user

const registerUser = async (req,res)=>{
    const {
        firstName,
        lastName,
        nic,
        contact,
        role,
        userName,
        password,
    } = req.body;

    //Check if existing user

    const existingUser = await User.findOne({userName: userName});

    if(existingUser){
        res.status(400).json({error: "User exist with same username"});
        return;
    }

    //password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password,salt);

    //creating user on db
    try{
        const user = await User.create(
            {
                firstName,
                lastName,
                nic,
                contact,
                role,
                userName,
                password: hashedPass,
            }
        );

        res.status(201).send("User added");

    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
    
};

const login = async(req,res)=>{
    try{
        if(req.body && req.body.username && req.body.password){
            const user = await User.findOne({userName : req.body.username});
            if(user){

                if(bcrypt.compareSync(req.body.password, user.password)){
                    const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{
                        expiresIn: "30d",
                    });

                    res.status(200).json({accessToken : token});
                }else{
                    res.status(401).json({errorMessage : "Invalid Password"});
                }
            }else{
                res.status(401).json({errorMessage : "User Not found"});
            }
        }else{
            res.status(401).json({errorMessage : "Username and password cannot be empty"});
        }
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

//test funtion
const test = async(req,res)=>{
    // if(req.user.role !='Admin'){
    //     res.status(401).json({errorMessage:"User not allowed to access requested resource"});
    // }else{
    //     res.status(200).json({role: req.user.role});
    // }

    let valid = await validateRole(req.user.role,"Admin");
    res.status(200).send(valid); 
}


module.exports = {
    registerUser,
    login,
    test
}
