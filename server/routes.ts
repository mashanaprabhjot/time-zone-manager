import * as express from 'express';

import UserCtrl from './controllers/user';
import TimezoneCtrl from './controllers/timezone';
import User from './models/user';
import TimeZone from './models/timezone';
import * as jwt from 'jsonwebtoken';

export default function setRoutes(app) {

    const apiRoutes  = express.Router();

    const userCtrl = new UserCtrl();
    const timezoneCtrl = new TimezoneCtrl();

   

    //var apiRoutes = express.Router();
    apiRoutes.route('/login').post(userCtrl.login);
    apiRoutes.route('/user').post(userCtrl.insertUser);
    apiRoutes.route('/user/getuserbyemail/:email').get(userCtrl.getUserbyEmail);

    // route middleware to verify a token
    apiRoutes.use(function (req, res, next) {
        //console.log("router.use");
        // check header or url parameters or post parameters for token

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    // TimeZone
    apiRoutes.route('/timezones/:userid').get(timezoneCtrl.getAll);
    apiRoutes.route('/timezones/count/:userid').get(timezoneCtrl.count);
    apiRoutes.route('/timezone/').post(timezoneCtrl.insert);
    apiRoutes.route('/timezone/:id/:userid').get(timezoneCtrl.get);
    apiRoutes.route('/timezone/getbyname/:name/:userid').get(timezoneCtrl.searchbyName);

    apiRoutes.route('/timezone/:id/:userid/').put(timezoneCtrl.update);
    apiRoutes.route('/timezone/:id/:userid').delete(timezoneCtrl.delete);

    // Users
    apiRoutes.route('/users').get(userCtrl.getAll);
    apiRoutes.route('/usersonly').get(userCtrl.getUsersOnly);
    apiRoutes.route('/users/count').get(userCtrl.count);
    
    apiRoutes.route('/user/:id').get(userCtrl.get);
    apiRoutes.route('/user/:id').put(userCtrl.update);
    apiRoutes.route('/user/:id').delete(userCtrl.delete);
    app.use('/api', apiRoutes);

}
