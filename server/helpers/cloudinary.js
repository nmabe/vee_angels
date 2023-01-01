const cloudinary = require('cloudinary').v2;
const multer  = require('multer');

cloudinary.config({
    cloud_name: 'dddjh584x',
    api_key: '411384768579979',
    api_secret: 'ZpacBU-xzH8VWbTtE_XonRryAKU'
});

const storage = new multer.memoryStorage();

const imageUploadUtil = async (file)  => {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    });
    return (result);
}

const imageDeleteUtil = async (image) => {

    const public_id = image.split('/').pop().split('.')[0];
    console.log('PUBLIC_id', public_id);
    // Validate public_id: must be a non-empty string and only contain allowed characters
    const isValidPublicId =
        typeof public_id === 'string' &&
        public_id.length > 0 &&
        /^[a-zA-Z0-9_\-]+$/.test(public_id)
    if (!isValidPublicId) {
        return {
        success: false,
        message: 'Error deleting image: Invalid public_id'
        }
    }

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id)

    if (result.result !== 'ok' && result.result !== 'not found') {
        return {
            success: false,
            message: 'Error deleting image'
        }
    } else {
        // 'ok' means deleted, 'not found' means image didn't exist, both are fine
        if (process.env.NODE_ENV !== 'production') {
            console.log('deleting image from db')
        }
    }
    return {
        success: true,
        message: 'Image deleted successfully'
    };
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtil, imageDeleteUtil};