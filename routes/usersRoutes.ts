import express from 'express';
const router = express.Router();


import {isAdmin,getId} from'../middleware/userMid'
import { getUsers } from '../controler/usersCont'
import { registerUser} from '../controler/usersCont'
import { login} from '../controler/usersCont'
import { updateUser} from '../controler/usersCont'
import { deleteUser} from '../controler/usersCont'
import { signOutUser} from '../controler/usersCont'

router
.get('/get-Users',isAdmin,getId,getUsers)
.post('/add-User',registerUser)
.post('/login',login)
.patch('/update-user',isAdmin,getId,updateUser)
.delete('/delete-user',isAdmin,getId,deleteUser)
.get('/signOut-user',signOutUser)

export default router;