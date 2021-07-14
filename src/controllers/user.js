const User = require('../models/user');
const path = require('path')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const sharp = require('sharp');
const { uuid } = require('uuidv4');
const { log } = require('console');
require('../auth/auth');

exports.createUser = async (req, res) => {
  const user = new User(req.body);

  if (user.ages <= 26) {
    user.position = 'young'
  } else if (user.ages >= 62) {
    user.position = 'retiree'
  } else {
    user.position = 'worker'
  }
  try {
    await user.save();
    res.status(201).json({ success: true, message: 'Successfully Registered!' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid authentication credentials!' });
  }
}



exports.loginWithPassport = async (req, res, next) => {
  passport.authenticate(
    'login',
    async (err, user) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred. Please try later');
          res.status(401).json({
            message: 'Enter correct credentials'
          })
          return next(error);
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

            return res.status(201).json({ token, expiresIn: 3600, user });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}

exports.readProfile = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user
  });
}

exports.userPhotoUpload = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found!'
    })
  }

  if (!req.files) {
    res.status(400).json({
      success: false,
      message: 'Please upload file!'
    })
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith('image')) {
    res.status(400).json({
      success: false,
      message: 'Please upload an image file!'
    })
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    res.status(400).json({
      success: false,
      message: 'Please upload an image less than 10MB!'
    })
  }

  file.name = `${uuid()}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: 'Please upload an image less than 10MB!'
      })
    }

    await User.findByIdAndUpdate(req.params.id, { image: file.name })

    res.status(200).json({
      success: true,
      data: file.name
    })
  })
}


exports.createFcmToken = async (req, res) => {
  const fcmToken = req.body.fcmToken
  const tokens = req.user.fcmTokens;
  const exists = tokens.includes(fcmToken)
  if(exists) {
    return
  }
  req.user.fcmTokens.push(fcmToken);
  await req.user.save();
}


exports.login = async (req, res) => {
  try {

    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken()

    // res.cookie('accessToken', token, {
    //   httpOnly: true,
    //   signed: true,
    //   sameSite: false
    // })
    // res.send({ token, expiresIn: 3600 });
    res.json({ success: true, token, expiresIn: 3600, user })
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
}
















