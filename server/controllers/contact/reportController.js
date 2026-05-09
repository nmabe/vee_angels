const Reports = require('../../models/Reports');

exports.addReport = async (req, res) => {
    try {
        const { targetId, title, details } = req.body;
        console.log('Received report data:', { targetId, title, details });
        const newReport = new Reports({ targetId, title, details });
        await newReport.save();
        res.status(200).json({ 
            success: true,
            report: newReport,});
    } catch (error) {
        console.error('Error adding report:', error);
        res.status(500).json({ 
            success: false,
            message: error.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await Reports.find();
        res.status(200).json({ 
            success: true,
            reports });
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ 
            success: false,
            message
            : error.message });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        await Reports.findByIdAndDelete(id);
        res.status(200).json({ 
            success: true,
            message: 'Report deleted successfully' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ 
            success: false,
            message: error.message });
    }
};

