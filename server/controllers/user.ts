import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';

import User from '../models/user';
import BaseCtrl from './base';

export default class UserCtrl extends BaseCtrl {
    model = User;

    login = (req, res) => {
        this.model.findOne({ email: req.body.email }, (err, user) => {
            if (!user) { return res.sendStatus(403); }
            user.comparePassword(req.body.password, (error, isMatch) => {
                if (!isMatch) { return res.sendStatus(403); }
                const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                res.status(200).json({ token: token });
            });
        });
    };
    getUserbyEmail = (req, res) => {
        console.log("request received")
        this.model.find({ email: { '$regex': req.params.email, $options: 'i' } }, (err, docs) => {
            if (err) { return console.error(err); }
            console.log(docs);
            res.json(docs);
        });
    };

    getUsersOnly = (req, res) => {
        console.log("request received")
        this.model.find({ role: { '$regex': 'user', $options: 'i' }}, (err, docs) => {
            if (err) { return console.error(err); }
            console.log(docs);
            res.json(docs);
        });
    };

    insertUser = (req, res) => {
        const obj = new this.model(req.body);
        var password = obj.password;
        obj.save((err, item) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                res.sendStatus(400);
            }
            if (err) {
                return console.error(err);
            }

            console.log(process.env.SMTP_USERNAME);

            var fullUrl = req.protocol + '://' + req.get('host');
            var html = '<div> <p>Hi ' + obj.username + '</p><p><span>Your account has been created at </span><a href="' + fullUrl +'">Time Zone Manager</a></p>'
                + '<p><b>Username:</b>' + obj.username + '</p>'
                + '<p><b>Password:</b>' + password + '</p>'
                + '<p>Thanks</p></div>';

            var transporter = nodemailer.createTransport('smtps://' + process.env.SMTP_USERNAME + ':' + process.env.SMTP_PASSWORD + '@smtp.gmail.com');
            var mailOptions = {
                from: process.env.SMTP_USERNAME, // sender address 
                to: obj.email, // list of receivers 
                subject: 'Account Created at TimeZoneManager', // Subject line 
                html: html// html body 
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

    }

}
