'use strict';

var host     = 'http://localhost:8080';
var token    = '';                      //auth token

var falkonry = new Falkonry(host, token);


it('Should get output stream', function(done) {
    return falkonry.getResponse(pipelineID, function (error, response) {
        assert.equal(error, null, 'Emitter not created');
    });

    return falkonry.endResponse(pipelineID, emitter, function (error, response) {
        assert.equal(error, null, 'Error stopping outflow');
    });
});


/**index.js
 *
 */


FalkonryService.prototype.getResponse = function(pipelineID, done) {
    var emitter = new Events.EventEmitter();
    emitter.on('startEmitter', function () {
        //var response = _this.service.getOutputStream(pipeline, start);
    });
    return done(null, emitter);
};



FalkonryService.prototype.endResponse = function(pipelineID, emitter, done) {
    emitter.removeListener('startEmitter', function () {
        //post-output code
    })
};

/**falkonry.js
 *


FalkonryService.prototype.getOutputStream = function (pipeline, start, done) {
*/