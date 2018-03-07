const express = require('express');
const router = express.Router();
const dock = new require('../docker/docker');
const Docker = new dock.Docker({
    "socketPath": "/var/run/docker.sock",
    "version": "/v1.35"
});

router.get('/stop/:id', function(req, res, next) {
    Docker.container().stop(req.params.id, (error, json) => {
        res.json(json);
    });
});

router.get('/logs/:id', function(req, res, next) {
    Docker.container().logs(req.params.id, (error, json) => {
        res.json(json);
    });
});

router.get('/inactive', function(req, res, next) {
    Docker.container().inactive(req.params.id, (error, json) => {
        res.json(json);
    });
});

module.exports = router;
