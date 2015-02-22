var Router = require('react-router');

var SessionHelper = require('../../helpers/session-helper');
var debug = require('debug')('game:pages:mixins:auth');
var mediator = require('../../mediator');
var actionTypes = require('../../constants/action-types');

var Navigation = Router.Navigation;

var AuthMixin = {
  mixins: [Navigation],
  componentDidMount: function() {
    mediator.on(actionTypes.UNAUTHORIZED, this._handleUnauthorized);
  },
  componentWillUnmount: function() {
    mediator.removeListener(actionTypes.UNAUTHORIZED, this._handleUnauthorized);
  },
  _handleUnauthorized: function() {
    mediator.emit(actionTypes.MESSAGE, 'Unauthorized catched');
    this.transitionTo('/');
  },
  statics: {
    willTransitionTo: function(transition) {
      if (!SessionHelper.isSignin()) {
        transition.abort();
        debug('access closed %s', transition.path);
        transition.redirect('/');
      }
    }
  }
};

module.exports = AuthMixin;
