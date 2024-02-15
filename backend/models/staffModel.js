const crypto = require('cryptojs');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'A staff member must have an email.'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    userNameSurname: {
        type: String,
        required: [true, 'Please provide your name and surname.']
    },
    phoneNumber: {
        type: String,
        unique: true,
        // Required ?
    },
    userRole: {
        type: String,
        required: [true, 'Please provide a staff role.'],
        enum: ['admin', 'staff'],
        default: 'staff',
    },
    password: {
        type: String,
        required: [true, 'A user must have a password.'],
        minlength: [8, 'A password must have more or equal then 8 characters.'],
        validate: {
            validator: function (val) {
                const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                const hasUpperCase = /[A-Z]/.test(val);
                const hasNumber = /\d/.test(val);
                return specialCharacters.test(val) && hasUpperCase && hasNumber;
            },
            message: 'Password must contain at least one uppercase letter, one number' +
                'and one special character.'
        },
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: "Passwords doesn't match."
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
});

staffSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    next();
});

staffSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

staffSchema.methods.passwordConfirmation = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

staffSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // NOT Changed
    return false;
}


const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;