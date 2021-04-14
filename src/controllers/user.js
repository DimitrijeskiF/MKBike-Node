const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const sharp = require('sharp');
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
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
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
    res.json({ token, expiresIn: 3600, user })
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.loginWithPassport = async (req, res, next) => {
  passport.authenticate(
    'login',
    async (err, user) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred.');

          return next(error);
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

            return res.json({ token, expiresIn: 3600, user });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    })

    await req.user.save();

    res.send()
  } catch (error) {
    res.status(500).send();
  }
}

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
}

exports.readProfile = async (req, res) => {
  res.cookie('readme', 'readme')
  res.send(req.user);
}

exports.deactivate = async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
}

exports.upload = multer({
  limits: {
    fileSize: 2000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload picture'))
    }

    return cb(undefined, true);
  }
})

exports.uploadProfileImage = async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
  req.user.image = buffer;
  await req.user.save();
  res.send()
}

exports.deleteProfilePicture = async (req, res) => {
  req.user.image = undefined;
  await req.user.save();
  res.send();
}

exports.getProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.image) {
      throw new Error();
    }

    res.set('Content-Type', 'image/jpg');
    res.send(user.image);
  } catch (error) {
    res.status(404).send()
  }
}














