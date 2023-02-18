import Task from '../models/Task'
import jwt from 'jsonwebtoken'
import {Request, Response} from 'express'

export const newTask = async(req: Request, res: Response) => {
    const {title, description, token} = req.body
    const decodedToken:any = jwt.decode(token)
    
    const task = new Task({
        title,
        description,
        userId: decodedToken.id
    })
    await task.save()
}

export const getTasks = async(req: Request,  res: Response) => {
    const token = req.params.token
    const decodedToken:any = jwt.decode(token)
    const id = decodedToken.id

    const tasks = await Task.find({userId: id})
    return res.json(tasks)
}

export const deleteTask = async(req: Request, res: Response) => {
    await Task.findByIdAndDelete(req.params.id)
    return res.json({success: true})
}

export const updateTask = async (req: Request, res: Response) => {
    const { title, description } = req.body
    await Task.findByIdAndUpdate(req.params.id, {
        title,
        description
    })
    return res.json({success: true})
}