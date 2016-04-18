import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

const Menu = (props, context) => {
  const { router } = context;

  const items = [{
    label: 'General',
    path: '/preferences/general',
  }, {
    label: 'Images',
    path: '/preferences/images',
  }];

  return (
    <ul className="uk-nav uk-nav-side">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames({ 'uk-active': router.isActive(item.path) })}
        >
          <Link to={item.path}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

Menu.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default Menu;
