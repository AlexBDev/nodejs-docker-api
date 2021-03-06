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
        this.req(path, method, options, (error, data, response) => {
             if (error) {
                 callback(error);

                 return;
             }

            callback(null, JSON.parse(data || '{}'), response);
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
                console.log('REQUEST : '+path);
                console.log(data);
                console.log(response.statusCode);
                console.log('END REQUEST : '+path);
                callback(null, data, response);
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