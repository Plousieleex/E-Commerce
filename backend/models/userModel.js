const crypto = require('cryptojs');
const mongoose = require('mongoose');
const validator = require('validator');
const bcyrpt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'A user must have an email.'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    userNameSurname: {
        type: String,
        required: [true, 'Please provide your name and surname.']
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    userRole: {
        type: String,
        enum: ['admin', 'staff', 'user'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'A user must have a password.'],
        minlength: [8, 'A password must have more or equal then 8 characters.'],
        validate: {
            validator: function(val){
                const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                const hasUpperCase = /[A-Z]/.test(val);
                const hasNumber = /\d/.test(val);
                return specialCharacters.test(val) && hasUpperCase && hasNumber;
            },
            message: 'Password must contain at least one uppercase letter, one number ' +
                'and one special character.'
        },
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate: {
            validator: function (val){
                return val === this.password;
            },
            message: "Passwords doesn't match."
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcyrpt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next){
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// If someone tries to register they will be automatically assign as a 'user'
// userSchema.pre('save', function (next){
//     if(this.isNew){
//         this.userRole = 'user';
//     }
//     next();
// });

userSchema.methods.passwordConfirmation = async function(
    candidatePassword,
    userPassword
){
    return await bcyrpt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimeStamp;
    }

    // False means NOT Changed

    return false;
};

userSchema.methods.createPasswordResetToken = function (){
    const resetToken = crypto.lib.WordArray.random(32).toString();
    this.passwordResetToken = crypto.SHA256(resetToken).toString();
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};



const User = mongoose.model('User', userSchema);

module.exports = User;