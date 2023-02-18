import {Request, Response, NextFunction} from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'

export const registerUser = async (req: Request, res: Response) => {
    const {email, password} = req.body
    console.log({email, password})
    if(!email || !password) return res.json({msg: 'Please complete the form', success: false})

    const existingUser = await User.findOne({email})
    console.log(existingUser)
    if(existingUser != null) return res.json({success: false, msg: 'This user already exists'})

    const user = new User({email, password})
    user.password = await user.encryptPassword(user.password)
    await user.save()
    return res.json({success: true})
}

export const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user == null) return res.json({success: false, msg: 'User doesnt exist'})
    
    const validPassword = await user.verifyPassword(password)
    if(!validPassword) return res.json({success: false, msg: 'Invalid password'})

    const token = jwt.sign({
        id: user._id
    }, process.env.SECRET)

    return res.json({token, success: true, msg:'Logged in succesfully'})
}
