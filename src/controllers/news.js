const News = require('../models/News');



exports.createNews = async(req, res) => {
    const news = new News(req.body);

    try {
        await news.save();
        res.status(201).json({
            success: true,
            news
        })
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
}

exports.getNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json({
            news
        })
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}