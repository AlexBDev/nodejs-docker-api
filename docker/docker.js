let Request = require('./request').Request;
let Container = require('./docker-container').Container;

class Docker {
    constructor(options) {
        this.instances = {
            request: new Request(options),
            container: null,
        };
    }

    container() {
        if (this.instances.container === null) {
            this.instances.container = new Container(this.instances.request);
        }

        return this.instances.container;
    }
}

module.exports = { Docker };