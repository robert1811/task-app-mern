import { Request, Response, NextFunction } from 'express'

export const requireAuth = async(req: Request, res: Response, next:NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if(token == undefined) return res.status(401).json({msg: 'unauthorized'})
    
    next()
}