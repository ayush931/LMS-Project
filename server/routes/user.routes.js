import { Router } from "express";
import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword, updateUser } from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import uplaod from "../middlewares/multer.middleware.js";

const router = Router()

router.post('/register', uplaod.single('avatar'), register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/me', isLoggedIn, getProfile)
router.post('/reset', forgotPassword)
router.post('/reset/:resetToken', resetPassword)
router.post('/change-password', isLoggedIn, changePassword)
router.put('/update', isLoggedIn, uplaod.single('avatar'), updateUser)

export default router