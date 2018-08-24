require('envkey');
var Heroku = require('heroku.node');


var ERRORS = {
    NO_APP_SPECIFIED: 'Whoops, you failed to provide an Heroku application name'
};

function slashHeroku(token, options) {
    //var client = new Heroku(options);
    this.token = token;
    //this.jiraOpts = options.jira;

    this.client = new Heroku({
        email: options.email,
        api_key: options.api_key
    })
}

slashHeroku.prototype.handle = function (req, cb) {
    var bodyText = req.body.text;
    console.log('looking for dyno name:', req.body.text);
    if (!bodyText) {
        return cb(null,this._createSlackMessage(ERRORS.NO_APP_SPECIFIED));
    }
    return this._rebootHerokuApplication(appName, cb);
};

slashHeroku.prototype._rebootHerokuApplication = function (appName, cb) {
    var self = this;
    this.client.app(appName).dynos.restart(function (err) {
        if (err) {
            return cb(null,self._createSlackMessage("Unable to restart app, did you spell it properly? " + appName));
        } else {
            return cb(null,slef._createSlackMessage(appName + ' has been rebooted at Heroku!'));
        }
    })
};


slashHeroku.prototype._createSlackMessage = function (slackMessage) {
    return slackMessage;
};

module.exports = slashHeroku;
