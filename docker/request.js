let http = require('http');
let fs = require('fs');

class Request {
    constructor(options) {
        this.options = Object.assign(
            {
                "socketPath": null,
                "version": null
            },
            options
        );
    }

    json(path, method, options = {}, callback) {
        this.req(path, method, options, (error, data) => {
             if (error) {
                 callback(error);

                 return;
             }

            callback(null, JSON.parse(data || '{}'));
        });
    }

    req(path, method, options = {}, callback) {
        options.path = this.getPath(path);
        options.socketPath = this.options.socketPath;
        options.method = method;

        http.request(options, response => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                callback(null, data);
            });
        })
        .on('error', (error) => {
            console.error(error);
            callback(error);
        })
        .end();
    }

    getPath(path) {
        if (typeof path !== 'string') {
            throw new Error("options.path must be a string");
        }

        return this.options.version+path;
    }
}

module.exports = { Request };