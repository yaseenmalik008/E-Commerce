import asyncHandler from "express-async-handler"
import jwt  from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect  = asyncHandler(async(req,res,next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    )
    {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            throw new Error("Not Authorized, Token Failed")
            
        }
    }else{
        throw new Error('No Token Found')
    }

})

export {protect}