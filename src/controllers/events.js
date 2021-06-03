const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const event = new Event(req.body);

    try {
        await event.save()
        res.status(201).json({
            success: true,
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
      const events = await Event.find()
        res.status(200).json({
            success: true,
            events
        })
    } catch (error) {
        res.status(400).json({
            message:'There is some problem, please try later!',
            success: false,
            error
        })
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}