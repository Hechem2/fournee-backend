const User = require("../models/user");
const express = require('express');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken')


const app = express();


const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = new User(req.body);

        const {username} = req.body;
        const exist = await User.findOne({username});

        if (exist) res.status(400).send({error: "User already exists"});
        const newUser = await user.save();
        return res.status(201).json(newUser);
        
    } catch (error) {
        console.log (error)
    }
};


const getUsers = async (req, res) => {

    try{
        const usersList = await User.find();

        res.json(usersList);
    } catch (error) {
        console.log("Error : ", error);
    }
};

const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = new User(req.body);

        const {username, email, password} = req.body;
        const exist = await User.findOne({email});

        if (exist) res.status(400).send({error: "User already exists"});
    
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Store user in database
        user.password = hashedPassword;

          const newUser = await user.save();

          const payload = {
            user: {
                id: newUser.id 
            }

          }
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '7 days',

            },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token})
            }
          )

        
    } catch (error) {
        console.log (error)
    }
};

const loginUser = async (req, res) => {
    const {username, email, password} = req.body;
    console.log(req.body)
    try {
        let user = await  User.findOne({email});
        console.log(user)
        if (!user) {
            return res.status(400).json({msg: 'Email not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: "Email or password incorrect"})
        }

        
        const payload = {
            user: {
                id: user.id 
            }

        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '7 days',

            },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token})
            }
        )

    } catch (error) {
       res.status(500).json({msg: "Error logging in",
    error: error.message}) 
    }
}


const getUser = async (req, res) => {

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        res.json(user);
    } catch (error) {
        console.log("Error : ", error);
    }
};


const deleteUser = async (req, res) => {

    try {
        const userId = req.params.id;
        const check_user = await User.findById(userId);

        check_user ? await check_user.deleteOne() : res.status(400).json({
            msg: "User not found"
        })
        return res.status(201).json(
            {
                msg: "User successfully deleted",
                user: check_user
            }
        );
    } catch (error) {
        console.log("Error : ", error);
    }
};


const updateUser = async (req,res) => {
    try{
        const userId = req.params.id;
        const updateUserInfo = res.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: "Setting not found" })
        }
        await user.updateOne(updateUserInfo);

        const updatedUser = await User.findById(userId);

        return res.status(201).json({
            msg: "User successfully updated",
            User: updatedUser
        });
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
};


module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    registerUser,
    loginUser,
}
    
    


    
 