let req = require('./request');
const { URL } = require('url');


class Container {
    constructor(Request) {
        console.log(Request);
        if (!Request instanceof req.Request) {
            throw new Error("Request must be an instance of Request");
        }

        /**
         * @type req.Request
         */
        this.request = Request;
    };

    list(callback) {
        this.request.json('/containers/json', 'GET', {}, (error, content, response) => {
            if (error) {
                callback(error);

                return;
            }

            callback(null, content, response);
        });
    };

    inspect(id, callback) {
        this.request.json('/containers/'+id+'/json', 'GET', {}, (error, content, response) => {
            if (error) {
                callback(error);

                return;
            }

            callback(null, content, response);
        });
    };

    top(id, callback) {
        this.request.json('/containers/'+id+'/top', 'GET', {}, (error, content, response) => {
            if (error) {
                callback(error);

                return;
            }

            callback(null, content, response);
        });
    };

    stop(id, callback) {
        this.request.json('/containers/'+id+'/stop', 'POST', {}, (error, content, response) => {
            if (error) {
                callback(error);

                return;
            }

            if (!content.hasOwnProperty('message')) {
                content.success = true;
            }

            callback(null, content, response);
        });
    };

    logs(id, callback) {
        this.request.req('/containers/'+id+'/logs?stdout=true&stderr=true', 'GET', {}, (error, content, response) => {
            if (error) {
                callback(error);

                return;
            }

            callback(null, content, response);
        });
    };

    inactive(callback) {
        this.request.json('/containers/json?filters='+encodeURIComponent('{"status": ["exited"]}'), 'GET', {}, (error, content, response) => {
            if (error) {
                callback(error);

                return;
            }

            callback(null, content, response);
        });
    };

    remove(id, callback) {
        this.request.json('/containers/'+id, 'DELETE', {}, (error, content, response) => {
            if (error) {
                callback(error);

                return;
            }

            callback(null, content, response);
        });
    };

    start(id, callback) {
        this.request.json('/containers/'+id+'/start', 'POST', {}, (error, content, response) => {
            if (error) {
                callback(error);

                return;
            }

            callback(null, content, response);
        });
    };
}



module.exports = { Container };