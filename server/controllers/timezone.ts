import TimeZone from '../models/timezone';

export default class TimezoneCtrl {
    model = TimeZone;

    // Get all
    getAll = (req, res) => {
        console.log("request received")
        this.model.find({ UserId: req.params.userid}, (err, docs) => {
            if (err) { return console.error(err); }
            console.log(docs);
            res.json(docs);
        });
    };

    // Count all
    count = (req, res) => {
        this.model.count({ UserId: req.params.userid }, (err, count) => {
            if (err) { return console.error(err); }
            res.json(count);
        });
    };

    // Insert
    insert = (req, res) => {
        const obj = new this.model(req.body);
        obj.save((err, item) => {
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
    get = (req, res) => {
        this.model.findOne({ _id: req.params.id, UserId: req.params.userid }, (err, obj) => {
            if (err) { return console.error(err); }
            res.json(obj);
        });
    };

    // Update by id
    update = (req, res) => {
        this.model.findOneAndUpdate({ _id: req.params.id, UserId: req.params.userid}, req.body, (err) => {
            if (err) { return console.error(err); }
            res.sendStatus(200);
        });
    };

    // Delete by id
    delete = (req, res) => {
        this.model.findOneAndRemove({ _id: req.params.id, UserId: req.params.userid }, (err) => {
            if (err) { return console.error(err); }
            res.sendStatus(200);
        });
    };



    searchbyName = (req, res) => {
        this.model.find({ name: { '$regex': req.params.name, $options: 'i' }, UserId: req.params.userid }, (err, docs) => {
            if (err) { return console.error(err); }
            console.log(docs);
            res.json(docs);
        });
    };
}
