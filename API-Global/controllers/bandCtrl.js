const Band = require('../models/bandModel');

const bandCtrl = {
    createBand: async (req, res) => {
        try {
            const { name } = req.body;
            const band = await Band.findOne({ name: name });
            if (band) {
                return res.status(400).json({ msg: "This category has already existed." });
            }
            const newBand = new Band({
                name: name
            });
            await newBand.save();
            res.json({ msg: "Category created!", newBand });
            } catch (error) {
            res.status(500).json({ message: error.message });
            }
    },
    getBand : async (req, res) =>{
        try {
            const band = await Band.find();
            res.json(band)
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = bandCtrl;