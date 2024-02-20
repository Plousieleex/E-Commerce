const crypto = require('cryptojs');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const {request, static} = require("express");

class User {
    constructor(userModel) {
        this.userModel = userModel;
        this.userSchema = new mongoose.Schema({
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
                // Required?
            },
            userRole: {
                type: String,
                required: [true, 'Please provide a user role.'],
                enum: ['admin', 'staff', 'user'],
                default: 'user'
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
                    message: 'Password must contain at least one uppercase letter, one number ' +
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
                    message: "Password doesn't match."
                }
            },
            passwordChangedAt: Date,
            passwordResetToken: String,
            passwordResetExpires: Date
        });

        this.userModel = mongoose.model('User', this.userSchema);
    }
    static userModel = new User().userModel;
    static async createUser(userData) {
        const newUser = await User.userModel.create(userData);
        return newUser;
    }

    static async getAllUsers() {
        const allUsers = await User.userModel.find();
        return allUsers;
    }
}

module.exports = User;