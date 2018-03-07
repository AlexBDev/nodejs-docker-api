const express = require('express');
const router = express.Router();
const dock = new require('../docker/docker');
const Docker = new dock.Docker({
    "socketPath": "/var/run/docker.sock",
    "version": "/v1.26"
});

router.get('/stop/:id', function(req, res, next) {
    Docker.container().stop(req.params.id, (error, json) => {
        res.json(json);
    });
});

module.exports = router;
