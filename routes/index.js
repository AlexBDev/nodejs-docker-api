const express = require('express');
const router = express.Router();
const dock = new require('../docker/docker');

/* GET home page. */
router.get('/', function(req, res, next) {
    const Docker = new dock.Docker({
        "socketPath": "/var/run/docker.sock",
        "version": "/v1.26"
    });

    Docker.container().list((error, json) => {
        res.render('containers/list', { title: 'Docker API NODE', list: json});
    });

});

module.exports = router;
