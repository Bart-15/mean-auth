const path = require('path');
const bycrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const secret = process.env.JWT_SECRET


const register = async (req, res) => {
    // Check if the the username is already taken
       const user = await User.findOne({username: req.body.username});
       
       try{
            if(user) {
                return res.status(400).json({username:"Username is already taken."})
            }
            //Hash the password 
            const hashedPass =  await bycrypt.hash(req.body.password, 8)
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hashedPass
            })

            // final step is save to database
            await newUser.save()
            res.status(200).json({
                success: true
            })
        } catch (err) {
            res.status(500).json()
        }
     
}


const login  = async (req, res) => {  
    try{
        // check username if it exists
        const user = await User.findOne({username:req.body.username})
        if(!user) {
            return res.status(404).json({message:"User not found."})
        }
        // compare the password
        const comaprePass = await bycrypt.compare(req.body.password, user.password)
        if(!comaprePass) {
            return res.status(400).json({message:"Password does not match"})
        }
        
        const payload = {
            _id:user._id,
            name:user.name,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(payload, secret, {expiresIn: 3600})
        
        res.status(200).json({
            success: true,
            token:token,
            user: payload
            // token: `Bearer ${token}`
        })
    }catch(e){
        res.status(404).json()
    }
}

const profile = async (req, res) => {
    const user = {
        _id:req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email
    }

    res.status(200).json(user)
}

module.exports = {
    register,
    login,
    profile
}