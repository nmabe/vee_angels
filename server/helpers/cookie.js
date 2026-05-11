const jwt = require('jsonwebtoken');
require('dotenv').config();

const refreshCookie = ( res, user, msg =  'Cookie updated successfully.') => {

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
        

        res.cookie('token', token, {httpOnly: true, secure: false}).json({
                success: true,
                message: msg,
                user: {user}
        });
}

module.exports = {refreshCookie};