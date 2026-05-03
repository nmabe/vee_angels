const Reports = require('../../models/Reports');

exports.addReport = async (req, res) => {
    try {
        const { title, details } = req.body;
        const newReport = new Reports({ title, details });
        await newReport.save();
        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await Reports.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        await Reports.findByIdAndDelete(id);
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

