const News = require('../models/News');



exports.createNews = async (req, res) => {
    const news = new News(req.body);

    try {
        await news.save();
        res.status(201).json({
            success: true,
        })
    } catch (error) {
        res.json({
            success: false,
            message: 'There is some problem, please check later!',
            error
        })
    }
}

exports.getNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json({
            success: true,
            news
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}


exports.deleteNews = async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}