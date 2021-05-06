const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const event = new Event(req.body);

    try {
        await event.save()
        res.status(201).json({
            success: true,
            event
        })
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
}


exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({
            events
        })
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}