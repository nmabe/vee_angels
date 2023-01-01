const mongoose = require('mongoose');
const { imageUploadUtil, imageDeleteUtil } = require('../../helpers/cloudinary');
const { Angel } = require('../../models/Angel');
const cloudinary = require('cloudinary').v2;

const handleRequiredErrors = (errorStr) => {
    const tempErrorStr = errorStr.replace('Angel validation failed:', '').trim();
    const parts = tempErrorStr.split(',')
                .map(part => part.trim());

    const ret = {};
    parts.forEach(element => {
        const [key, value] = element.split(':').
        map(item => item.trim());
    
        if (key && value) {
            const cleanVal = value
            .replace(/Path/g, '')
            .replace(/`/g, '')
            .trim();

            ret[key] = cleanVal;
        }
    });
    return (ret);
}

const isEmpty = (obj) => {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

const handleFileUpload = async (req, res, next) => {
    let ret = {};
    try {
        ret = await Promise.all(req.files.map(async (file) => {
            const b64 = Buffer.from(file.buffer).toString('base64');
            const url = 'data:' + file.mimetype + ';base64,' + b64;
            
            return await imageUploadUtil(url);
        }));

        if (ret.length){
            res.json({
                success: true,
                ret,
            });
        }else {
            res.json({
                success: false,
                message: 'File Upload Error, Try with different pictures.',
            });    
        }
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: 'File Upload Error',
        });
        next(error);
    }
}

// Add Angel 
const addAngel = async (req, res) => {
    const newAngel = new Angel({
        username: req.body.username ,
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
        status: 'Active'
    });

    try {
        await newAngel.save().then((angel) => res.status(200).json({
            success: true,
            angel
        }));

    } catch (error) {
        const errObj = handleRequiredErrors(error.message);

        if (!isEmpty(errObj)) {
            res.json({
                success: false,
                message: errObj
            });
        }else {
            res.json({
                success: false,
                message: 'Error Something went wrong while adding new angel profile'
            });
        }
    }
}


// get Angels
const getAngels = async (req, res) => {
    try {
            await Angel.find().sort({createdAt: -1}).then((angels) => 
            res.status(200).json({
                success: true,
                angels
            }));
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: 'Error getting angels'
        });
    }    
}

// delete Angel
const removeAngel = async (req, res) => {
    const { id } = req.params;
    const { profPicUrl} = req.body;

    
    try{
        profPicUrl.map((image) => {
            imageDeleteUtil(image, res);
        });
        
        await Angel.findByIdAndDelete(id).then(() => {
            res.status(200).json({
                success: true
            });
        });
    }catch(error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: 'Error deleting this user from list of angels'
        });
    }    
}

// edit Angel 

const editAngel = async (req, res) => {
    let newAngelUpdate = req.body;
    delete newAngelUpdate._id;
    delete newAngelUpdate.createdAt;
    newAngelUpdate.updatedAt = new Date().toLocaleString(); 
    
    console.log(newAngelUpdate);

    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid or missing angel ID'
        });
    }

    try {
        await Angel.findByIdAndUpdate(id, {$set: newAngelUpdate}, {new: true} ).then((angel) =>
            res.status(200).json({
                success: true,
                angel
            })
        );
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: 'Error updating this user'
        });
    }
}

const deleteAngelImage = async (req, res) => {
    const { angelData, image } = req.body;
    console.log('IMAGE_URL', image);

    try {
            imageDeleteUtil(image, res);
            try {
                const angel = await Angel.findByIdAndUpdate(req.params.id, { $set: angelData }, { new: true });

                return res.status(200).json({
                    success: true,
                    angel
                });
            } catch (error) {
                console.log(error);
                return res.status(401).json({
                    success: false,
                    message: 'Error updating this user'
                });
            }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: 'Error deleting image'
        });
    }
}

const deactivateAnAngel = (req, res) => {
    const { id } = req.params;
    
    try {
        Angel.findByIdAndUpdate(id, {status: 'Deactive'}, {new: true}).then((angel) =>
            res.status(200).json({
                success: true,
                angel
            })
        );
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            message: 'Error updating this user'
        });
    }
}

const activateAnAngel = (req, res) => {
    const { id } = req.params;
    
    try {
        Angel.findByIdAndUpdate(id, {status: 'Active'}, {new: true}).then((angel) =>
            res.status(200).json({
                success: true,
                angel
            })
        );
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            message: 'Error updating this user'
        });
    }
}

module.exports = {
    handleFileUpload,
    addAngel,
    getAngels,
    removeAngel,
    editAngel,
    deleteAngelImage,
    handleRequiredErrors,
    isEmpty,
    deactivateAnAngel,
    activateAnAngel
};