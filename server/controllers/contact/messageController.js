const Messages = require('../../models/Messages');

exports.createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ 
            success: true,
            message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json({ 
            success: true,
            messages });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message });
    }
};


exports.deleteMessages = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id);
        res.status(200).json({ 
            success: true,
            message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message });
    } 
}