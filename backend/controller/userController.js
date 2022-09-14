import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'


const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(email && (await user.matchPassword(password))){
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : null,
        })
    }else{
        res.json(401) // Unauthorized
        throw new Error('Inavalid Email or Password')
    }
})

export {authUser}