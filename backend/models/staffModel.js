const mongoose = require('mongoose');
const validator = require('validator');

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

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;