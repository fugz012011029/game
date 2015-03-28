var React = require('react');

var debug = require('debug')('game:components:hero:body-image-slot');

var HeroBodyImageSlot = React.createClass({
  propTypes: {
    image: React.PropTypes.object
  },
  render: function() {
    var image = (this.props.image) ? this.props.image.image :
      'images/hero-body/no-hero.png';

    var style = {
      position: 'absolute',
      width: this.props.width,
      height: this.props.height,
      top: this.props.top,
      left: this.props.left
    };

    debug('render');

    return (
      <div
        className="image-slot"
        style={style}>
        <img src={image} alt="" />
      </div>
    );
  }
});

module.exports = HeroBodyImageSlot;
