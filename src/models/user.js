const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    sex: {
        type: String,
        enum: ['Male', 'Female', 'other'],
    },
    ages: {
        type: Number,
        default: 12,
        validate(value) {
            if (value < 12) {
                throw new Error('Ages must be greater then 12');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Enter correct email!')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7
    },
    image: {
        type: String
    },
    position: {
        type: String
    },
    role: {
        type: String,
        trim: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    fcmTokens: [{
        type: String,
        default: [],
        trim: true,
    }]
})

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.methods.generateAuthToken = async function (req, res) {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await user.save();
    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.fcmTokens;

    return userObject;
}



userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}



const User = mongoose.model('User', userSchema)

module.exports = User
