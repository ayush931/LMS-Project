import User from "../models/user.models"
import AppError from "../utils/error.util"

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true
}

const register = async (req, res, next) => {
    const { fullName, email, password} = req.body

    if(!fullName || !email || !password) {
        return next (new AppError ('All fields are required', 400))
    }

    const userExists = await User.findOne({ email })

    if(userExists) {
        return next (new AppError ('Email already exists', 400))
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F268533%2Fpexels-photo-268533.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&tbnid=_-Vib8M68QmuuM&vet=12ahUKEwiPlprc8KCDAxXCa2wGHS9yBikQMygBegQIARB2..i&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Freflection%2F&docid=GAYubCMnDcwZgM&w=500&h=333&itg=1&q=images&ved=2ahUKEwiPlprc8KCDAxXCa2wGHS9yBikQMygBegQIARB2'
        }
    })

    if(!user) {
        return next(new AppError('User registration failed, please try again', 400))
    }

    // TODO: File upload

    await user.save()

    user.password = undefined

    const token = await user.generateJWTToken()

    res.cookie('token', token, cookieOptions)

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user
    })
}

const login = (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return next(new AppError('All fields are required'))
    }
}

const logout = (req, res) => {

}

const getProfile = (req, res) => {

}

export {
    register,
    login,
    logout,
    getProfile
}