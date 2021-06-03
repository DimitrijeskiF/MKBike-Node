const Price = require('../models/Price');


exports.createPrice = async (req, res) => {
    const price = new Price(req.body);
    try {
        await price.save();
        res.status(201).json({ success: true,});
    } catch (error) {
        res.status(400).json({
            success:false,
            message: 'There is some problem, please check later!',
            error
        });
    }
}

exports.findPricesForYoung = async (req, res) => {
    try {
        const price = await Price.findOne({ type: 'young' })
        res.status(200).json({ success: true, price: price.prices });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'There is some problem, please check later!',
            error
        });
    }
}

exports.findPricesForWorkers = async (req, res) => {
    try {
        const price = await Price.findOne({ type: 'worker' })
        res.status(200).json({ success: true, price: price.prices });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'There is some problem, please check later!',
            error
        });
    }
}

exports.findPricesForRetiree = async (req, res) => {
    try {
        const price = await Price.findOne({ type: 'retiree' })
        res.status(200).json({ success: true, price: price.prices });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'There is some problem, please check later!',
            error
        });
    }
}