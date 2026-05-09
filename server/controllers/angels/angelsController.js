const { response } = require('express');
const { Angel } = require('../../models/Angel');
const  Likes  = require('../../models/Likes');
const Comments = require('../../models/Comments');

const provinceHelper = (province) => {
    switch (province) {
        case 'gauteng':
            return('Gauteng');
            break;
        case 'kwazuluNatal':
            return ('Kwazulu Natal');
            break;
        case 'westernCape':
            return('Western Cape');
            break;
        case 'freeState':
            return('Free State');
            break;
        case 'mpumalanga':
            return('Mpumalanga');
            break;
        case 'northWest':
            return('North West');
            break;
        case 'limpopo':
            return('Limpopo');
            break;
        case 'easternCape':
            return('Eastern Cape');
            break;
        default:
            return('');
            break;
    }
}

const getAllLikes = async (req, res) => {
    try {
        const allLikes = await Likes.find({});
        res.status(200).json({ 
            success: true,
            message: 'All likes retrieved successfully', 
            likes: allLikes 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const likeAngel = async (req, res) => {
    const angelId  = req.params.id;
    const  userId = req.body.userId;

    try {
        const angel = await Angel.findById(angelId);

        if (!angel) {
            console.error('Angel not found');
            return res.json({ 
                success: false,
                message: 'Angel not found' });
        }

        // Check if the user has already liked the angel
        if (await Likes.findOne({ userId, angelId })) {
            console.error('You have already liked this angel');
            return res.json({ 
                success: false,
                message: 'You have already liked this angel' });
        }

        // Add the user's ID to the likes array
        const newLike = new Likes({
            userId,
            angelId
        });

        await newLike.save().then(() => {
            console.log('Angel liked successfully');
            res.status(200).json({ 
                success: true,
                message: 'Angel liked successfully', angel });
        });

    } catch (error) {
        console.error(error);
        return res.json({ message: 'Server error' });
    }
}

const getLikes = async (req, res) => {
    const userId = req.params.id;
    
    try {
        const likes = await Likes.find({ userId });

        if (!likes) {
            return res.status(404).json({ message: 'No likes found' });
        }

        res.status(200).json({ message: 'Likes retrieved successfully', likes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const unlikeAngel = async (req, res) => {
    const { id } = req.params;
    
    try {
        await Likes.findByIdAndDelete(id).then(() => {
            res.status(200).json({
                success: true,
                message: 'Angel unliked successfully'
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


const fetchFilteredAngels = async (req, res) => {
    const {province = [], rating = [], sort = 'newest'} = req.query;

    console.log('Sorting ----> :', req.query);
    const filter = {'status': {$ne: 'Deactive' }};

    if (province.length > 0) {
        
        filter['address.province'] = {
            $in: Array.isArray(province) ? province :  province.split(',').map(provinceHelper)
        };
    }

    if (rating.length > 0) {
        filter.rating = {
            $in: rating.split(',')
        }
    }

    let sortBy = {};

    switch (sort) {
        case 'priceLowToHigh':
            sortBy.price = -1; 
            break;
        case 'priceHighToLow':
            sortBy.price = 1
            break;
        case 'newest':
            sortBy.createdAt = -1
            break;
        case 'oldest':
            sortBy.createdAt = 1
            break;
        case 'mostPopular':
            sortBy.views = -1
            break;
        case 'highestRated':
            sortBy.rating = -1
            break;
        case 'mostFaved':
            sortBy.faves = -1
            break;
        default:
            sortBy = { createdAt: -1 }
    }

    console.log('Filter:', filter);
    console.log('Sort:', sortBy);
    try {
        await Angel.find(filter).sort(sortBy).then((angels) => {
            res.status(200).json({
                success: true,
                angels
            });
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: 'error getting angels'
        })
    }
}



const getComments = async (req, res) => {
    const angelId = req.params.id;

    try {
        const comments = await Comments.find({ angelId }).populate('userId', 'username profPic');

        if (!comments) {
            return res.status(404).json({ message: 'No comments found' });
        }

        res.status(200).json({ message: 'Comments retrieved successfully', comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const addComment = async (req, res) => {
    const angelId  = req.params.id;
    const  { userId, commentText } = req.body;
    try {
        const angel = await Angel.findById(angelId);

        if (!angel) {
            console.error('Angel not found');
            return res.json({ 
                success: false,
                message: 'Angel not found' });
        }

        // Add the user's ID to the comments array
        const newComment = new Comments({
            userId,
            angelId,
            commentText
        });

        await newComment.save().then(() => {
            console.log('Comment added successfully');
            res.status(200).json({ 
                success: true,
                message: 'Comment added successfully', angel });
        });

    } catch (error) {
        console.error(error);
        return res.json({ message: 'Server error' });
    }
}

const setView = async (req, res) => {
    const angelId = req.params.id;
    const deviceId = req.body.deviceId;

    console.log(`Setting view for angel ${angelId} from device ${deviceId}`);
    try {
        const angel = await Angel.findById(angelId);

        if (!angel) {
            console.error('Angel not found');
            return res.json({ 
                success: false,
                message: 'Angel not found' });
        }

        angel.views += 1;
        await angel.save();

        res.status(200).json({ 
            success: true,
            message: 'View count updated successfully', angel });
    } catch (error) {
        console.error(error);
        return res.json({ message: 'Server error' });
    }
}

const resetViews = async (req, res) => {
    try {
        await Angel.updateMany({}, { $set: { views: 0 } });
        res.status(200).json({ 
            success: true,
            message: 'View counts reset successfully' });
    } catch (error) {
        console.error(error);
        return res.json({ 
            success: false,
            message: 'Server error' });
    }
}

module.exports = { fetchFilteredAngels, likeAngel, unlikeAngel, getLikes, getComments, addComment, getAllLikes, setView, resetViews};