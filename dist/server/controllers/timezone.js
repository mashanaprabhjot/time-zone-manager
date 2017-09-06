"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timezone_1 = require("../models/timezone");
var TimezoneCtrl = (function () {
    function TimezoneCtrl() {
        var _this = this;
        this.model = timezone_1.default;
        // Get all
        this.getAll = function (req, res) {
            console.log("request received");
            _this.model.find({ UserId: req.params.userid }, function (err, docs) {
                if (err) {
                    return console.error(err);
                }
                console.log(docs);
                res.json(docs);
            });
        };
        // Count all
        this.count = function (req, res) {
            _this.model.count({ UserId: req.params.userid }, function (err, count) {
                if (err) {
                    return console.error(err);
                }
                res.json(count);
            });
        };
        // Insert
        this.insert = function (req, res) {
            var obj = new _this.model(req.body);
            obj.save(function (err, item) {
                // 11000 is the code for duplicate key error
                if (err && err.code === 11000) {
                    res.sendStatus(400);
                }
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(item);
            });
        };
        // Get by id
        this.get = function (req, res) {
            _this.model.findOne({ _id: req.params.id, UserId: req.params.userid }, function (err, obj) {
                if (err) {
                    return console.error(err);
                }
                res.json(obj);
            });
        };
        // Update by id
        this.update = function (req, res) {
            _this.model.findOneAndUpdate({ _id: req.params.id, UserId: req.params.userid }, req.body, function (err) {
                if (err) {
                    return console.error(err);
                }
                res.sendStatus(200);
            });
        };
        // Delete by id
        this.delete = function (req, res) {
            _this.model.findOneAndRemove({ _id: req.params.id, UserId: req.params.userid }, function (err) {
                if (err) {
                    return console.error(err);
                }
                res.sendStatus(200);
            });
        };
        this.searchbyName = function (req, res) {
            _this.model.find({ name: { '$regex': req.params.name, $options: 'i' }, UserId: req.params.userid }, function (err, docs) {
                if (err) {
                    return console.error(err);
                }
                console.log(docs);
                res.json(docs);
            });
        };
    }
    return TimezoneCtrl;
}());
exports.default = TimezoneCtrl;
//# sourceMappingURL=timezone.js.map