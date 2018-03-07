let req = require('./request');

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
        this.request.req('/containers/json', 'GET', {}, (error, content) => {
            if (error) {
                callback(error);

                return;
            }

            callback(null, content);
        });
    };

    inspect(id, callback) {
        this.request.req('/containers/'+id+'/json', 'GET', {}, (error, content) => {
            if (error) {
                callback(error);

                return;
            }

            callback(null, content);
        });
    };

    top(id, callback) {
        this.request.req('/containers/'+id+'/top', 'GET', {}, (error, content) => {
            if (error) {
                callback(error);

                return;
            }

            callback(null, content);
        });
    };

    stop(id, callback) {
        this.request.req('/containers/'+id+'/stop', 'POST', {}, (error, content) => {
            if (error) {
                callback(error);

                return;
            }

            if (!content.hasOwnProperty('message')) {
                content.success = true;
            }

            callback(null, content);
        });
    };
}



module.exports = { Container };