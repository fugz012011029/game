var React = require('react');
var Router = require('react-router');

var Master = require('./master');
var Home = require('./pages/home');
var HeroNewPage = require('./pages/hero/new');
var HeroShowPage = require('./pages/hero/show');

var Route = Router.Route;

var routes = (
  <Route path='/' handler={Master}>
    <Route path='/' handler={Home} />
    <Route path='heroes/new' handler={HeroNewPage} />
    <Route name='hero' path='heroes/show' handler={HeroShowPage} />
  </Route>
);

module.exports = routes;
