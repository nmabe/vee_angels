const { imageDeleteUtil } = require('../../helpers/cloudinary');
const { Angel } = require('../../models/Angel');
const { handleRequiredErrors, isEmpty } = require('../admin/angelsController');

const addApplication = async (req, res) => {
    const newApplication = new Angel({
        username: req.body.username,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
         phoneNumber: req.body.phoneNumber,
        address: {
            province: req.body.province,
            city: req.body.city,
            suburb: req.body.suburb,
            street: req.body.street,
            houseNumber: req.body.houseNumber
        },
        socialMedia: {
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            tiktok: req.body.tiktok
        },
        bio: req.body.bio,
        profPicUrl: req.body.profPicUrl,
        travel: req.body.travel,
        status: 'Deactive'
    });

    try {
        await newApplication.save().then((application) => {
            res.status(200).json({
                success: true,
                application
            });
        });
    } catch (error) {
        const errObj = handleRequiredErrors(error.message);
        console.log(errObj);

        if (!isEmpty(errObj))
        {
            res.json({
                success: false,
                message: errObj
            });
        }else {
             res.status(404).json({
                success: false,
                message: 'Error on our side handling your Application, Please try again'
            });
        }
    }
}

const getApplications = async (req, res) => {
    try {
        await Angel.find({ status: 'Deactive' }).sort({createdAt: -1}).then((applications) => {
            res.status(200).json({
                success: true,
                applications
            });
        });
    } catch (err) {
        console.log(err);
        res.status(402).json({
            success: false,
            message: 'Error getting applications.'
        });
    }
}

const approveApplication = async (req,res) => {
    const { id } = req.params;

    try {
        Angel.findByIdAndUpdate(id, {status: 'Active'}, {new: true}).then((applications) => {
            res.status(200).json({
                success: true,
                applications
            });
        });
    } catch ( err ) {
        console.log('reject Application Error: ', err);
        res.status(404).json({
            success: false,
            message: 'Error rejecting application.'
        });
    }

}

const rejectApplication = async (req, res) => {
    const { id } = req.params;
    const { profPicUrl } = req.body;
    console.log(profPicUrl);
 
     try {

        {profPicUrl && profPicUrl.length > 0 && profPicUrl?.map((image) => {
            const deleteResult = imageDeleteUtil(image);
            if (!deleteResult.success) {
                console.error('Error deleting application profile picture:', deleteResult.message);
                res.status(500).json({
                    success: false,
                    message: deleteResult.message
                });
                return; // Exit if deletion failed  
            }
        });}
        Angel.findByIdAndDelete(id).then((application) => {
            res.status(200).json({
                success: true,
            });
        });
    } catch ( err ) {
        console.log('reject Application Error: ', err);
        res.status(404).json({
            success: false,
            message: 'Error rejecting application.'
        });
    }
} 

module.exports = {
    addApplication,
    getApplications,
    approveApplication,
    rejectApplication
}