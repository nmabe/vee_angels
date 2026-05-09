const Messages = require('../../models/Messages');

const addMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new Messages({ name, email, message });
        await newMessage.save();
        res.status(201).json({ 
            success: true,
            message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const getMessages = async (req, res) => {
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


const deleteMessage = async (req, res) => {
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

module.exports = { addMessage, getMessages, deleteMessage };