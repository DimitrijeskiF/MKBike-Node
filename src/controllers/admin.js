const User = require('../models/user');

exports.getUsers = async (req, res) => {
    const limit = +req.query.limit
    const page = +req.query.page;

    try {
        let users;

        if (limit && page) {
            users = await User.find()
                .skip(limit * (page - 1))
                .limit(limit)
        } else {
            users = await Userf.find()
        }

        // const users = await User.find();
        res.status(200).json({
            count: await User.countDocuments(),
            currentPage: page,
            success: true,
            total: users.length,
            users
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error
        })
    }
}

exports.createUser = async (req, res) => {
    const user = await User.create(req.body);

    try {
        await user.save()
        res.status(201).json({
            success: true,
        })
    } catch (error) {
        res.status(400).json({
            success: true,
            error
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}