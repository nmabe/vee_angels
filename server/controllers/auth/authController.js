const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
require('dotenv').config();

const signInUser = async (req, res) => {    
    const isProduction = process.env.NODE_ENV === 'production';

    const {username, password } = req.body;

    if (!username || !password) {
        return res.json({
            success: false,
            message: 'All fields are required.'
        });
    }

    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    User.findOne(regex.test(username) ? {email: username} : {username}).then((user) => {
        if (!user) {
            console.log('User Not found: ', user);
            return res.json({
                success: false,
                message: "User doesn't exist."
            });
        }   
            
        bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Invalid Password.'
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email,
                username: user.username,
                profPic: user.profPic
            },
            process.env.JWT_USER_TOKEN,
            {expiresIn: '60m'}
        );
            console.log('Nou Ziya Khala: ', user);

        res.cookie("token", token, {
                    httpOnly: true, 
                    secure: true,
                    sameSite: isProduction ? 'Strict' : 'None',
                }).json({
                success: true,
                message: `Welcome back ${user.username}`,
                user: {
                    user
                }
            })
        });
    }); 
}

const signUpUser = async (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.json({
            success: false,
            message: 'All fields are required.'
        });
    }

    const  checkUserEmail = await User.findOne({ email });
        if (checkUserEmail) {
            return res.json({
                success: false,
                message: 'User with this email already exists, please try again with a different email'
        });
    }

    const  checkUsername = await User.findOne({ username });
        if (checkUsername) {
            return res.json({
                success: false,
                message: 'User with this username already exists, please try again with a different username'
            });
    }

    const newUser = new User({
        username: username,
        email: email,
        password: password
    });

    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(password, salt, (err, hash) => {
        
            if (err) {
                res.json({
                    success: false,
                    message: 'Something went wrong while registering your account'
                });
                throw err;
            }

            newUser.password = hash;

            newUser.save().then(user => {

                res.status(200).json({
                    success: true,
                    message: 'signing up your account was successful'
                });
            })
        });

    });
}

const signOutUser = (req, res) => {

    res.clearCookie('token');
    return res.status(200).json({
        success: true,
        message:  "Don't be a stranger"
    });
}

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.json({
            success: false,
            message: 'Unauthorized access token'
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_USER_TOKEN);
        req.user = decoded;
        next();
    } catch( error )  {
        res.json({
            success: false,
            message: 'Error: ' + error
        });
    };
}

module.exports = { signUpUser, signInUser, signOutUser, authMiddleware };
