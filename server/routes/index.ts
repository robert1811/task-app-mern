import { Router } from "express";
const router = Router()

import {registerUser, loginUser} from '../controllers/user.controllers'
import {newTask, getTasks, deleteTask, updateTask} from '../controllers/task.controllers'
import {requireAuth} from '../middlewares/requireAuth'

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/tasks/:token', requireAuth, getTasks)

router.delete('/task/:id', requireAuth, deleteTask)

router.put('/task/:id', requireAuth, updateTask)

router.post('/task', requireAuth, newTask)

module.exports = router
