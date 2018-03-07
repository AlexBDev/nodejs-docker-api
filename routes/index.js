const express = require('express');
const router = express.Router();
const dock = new require('../docker/docker');

/* GET home page. */
router.get('/', function(req, res, next) {
    const Docker = new dock.Docker({
        "socketPath": "/var/run/docker.sock",
        "version": "/v1.26"
    });

    let active = new Promise((resolve, reject) => {
        Docker.container().list((error, json) => {
           if (error) {
               reject(error);

               return;
           }

           resolve(json);
        });
    });

    let inactive = new Promise((resolve, reject) => {
        Docker.container().inactive((error, json) => {
           if (error) {
               reject(error);

               return;
           }

           resolve(json);
        });
    });

    Promise.all([active, inactive])
        .then(values => {
            console.log(values);
            res.render('containers/list', { title: 'Docker API NODE', list: values[0], listInactive: values[1]});
        })
        .catch(error => {
            throw error;
        })
    ;
});

module.exports = router;
