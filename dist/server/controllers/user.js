"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var user_1 = require("../models/user");
var base_1 = require("./base");
var UserCtrl = (function (_super) {
    __extends(UserCtrl, _super);
    function UserCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = user_1.default;
        _this.login = function (req, res) {
            _this.model.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    return res.sendStatus(403);
                }
                user.comparePassword(req.body.password, function (error, isMatch) {
                    if (!isMatch) {
                        return res.sendStatus(403);
                    }
                    var token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                    res.status(200).json({ token: token });
                });
            });
        };
        _this.getUserbyEmail = function (req, res) {
            console.log("request received");
            _this.model.find({ email: { '$regex': req.params.email, $options: 'i' } }, function (err, docs) {
                if (err) {
                    return console.error(err);
                }
                console.log(docs);
                res.json(docs);
            });
        };
        _this.getUsersOnly = function (req, res) {
            console.log("request received");
            _this.model.find({ role: { '$regex': 'user', $options: 'i' } }, function (err, docs) {
                if (err) {
                    return console.error(err);
                }
                console.log(docs);
                res.json(docs);
            });
        };
        _this.insertUser = function (req, res) {
            var obj = new _this.model(req.body);
            var password = obj.password;
            obj.save(function (err, item) {
                // 11000 is the code for duplicate key error
                if (err && err.code === 11000) {
                    res.sendStatus(400);
                }
                if (err) {
                    return console.error(err);
                }
                console.log(process.env.SMTP_USERNAME);
                var fullUrl = req.protocol + '://' + req.get('host');
                var html = '<div> <p>Hi ' + obj.username + '</p><p><span>Your account has been created at </span><a href="' + fullUrl + '">Time Zone Manager</a></p>'
                    + '<p><b>Username:</b>' + obj.username + '</p>'
                    + '<p><b>Password:</b>' + password + '</p>'
                    + '<p>Thanks</p></div>';
                var transporter = nodemailer.createTransport('smtps://' + process.env.SMTP_USERNAME + ':' + process.env.SMTP_PASSWORD + '@smtp.gmail.com');
                var mailOptions = {
                    from: process.env.SMTP_USERNAME,
                    to: obj.email,
                    subject: 'Account Created at TimeZoneManager',
                    html: html // html body 
                };
                // send mail with defined transport object 
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
                res.status(200).json(item);
            });
        };
        return _this;
    }
    return UserCtrl;
}(base_1.default));
exports.default = UserCtrl;
//# sourceMappingURL=user.js.map