"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});
// Before saving the user, hash the password
userSchema.pre('save', function (next) {
    var user = this;
    console.log('User Password : ' + user.password);
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
// Omit the password when returning a user
userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
});
var User = mongoose.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map