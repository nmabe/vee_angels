const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const Comments = require('../../models/Comments');
const { imageUploadUtil, imageDeleteUtil } = require('../../helpers/cloudinary');
const { refreshCookie } = require('../../helpers/cookie');

const changePassword = async (req, res) => {
  const { password } = req.body
  const userId = req.params.id

  if (!userId || !password) {
    return res.status(400).json({
      success: false,
      message: 'User ID and new username are required.'
    })
  }

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(password, salt)
    if (!newPassword) {
      return res.status(500).json({
        success: false,
        message: 'Error hashing password.'
      })
    }
    // Update the user's password

    user.password = newPassword // Assuming password is hashed before saving
    await user.save()

    res.json({
      success: true,
      message: 'Username updated successfully.',
      user: {
        id: user._id,
        user
      }
    })
  } catch (error) {
    console.error('Error updating password:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the password.'
    })
  }
}

const changeProfilePic = async (req, res, next) => {
  const { id } = req.params;

  
  let ret = {};
  try {
    
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = 'data:' + req.file.mimetype + ';base64,' + b64;
    ret = await imageUploadUtil(url);
    
    
    if (ret.url) {
      const imageUrl = ret.url; // Assuming you want the first uploaded image


      const user = await User.findById(id)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found.'
        })
      }

    if (user.profPic) {
        try {
            const image = user.profPic;
            const deleteResult = await imageDeleteUtil(image);
            if (!deleteResult.success) {
                res.status(500).json({
                    success: false,
                    message: deleteResult.message
                });
                return; // Exit if deletion failed
            }else {
              user.profPic = imageUrl;
              await user.save().then((newUser) => {
                refreshCookie(res, newUser, 'Profile picture updated successfully.');
              });
          }

        } catch (err) {
          console.error('Error deleting old profile picture:', err);
        }
      }
    } else {
      res.status(500).json({
        success: false,
        message: 'File Upload Error, Try with different pictures.'
      })  
    } 
  } catch (error) {
    console.error('Error updating profile picture:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the profile picture.'
    })
  }
}

const getUsers = async (req, res) => {
  try {
    User.find()
      .sort({ createdAt: -1 })
      .then((users) => {
        res.status(200).json({
          success: true,
          users
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(404).json({
          success: false,
          message: 'Error Getting users'
        })
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Error Getting users'
    })
  }
}

module.exports = {
  getUsers,
  changePassword,
  changeProfilePic
}
