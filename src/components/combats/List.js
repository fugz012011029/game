import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from '../shared/Button';

import mediator from '../../mediator';

import { fetchCombats, removeCombat, joinCombat, leaveCombat } from '../../actions/combatActions';

import moment from 'moment';

export default class List extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['duel']),
  };

  renderHero(warrior) {
    const hero = mediator.storage.heroes[warrior.warrior];
    return (
      <span>
        <a className="uk-icon-hover uk-icon-info-circle" />
        {' '}
        <span className="uk-text-bold">{hero.login} [{hero.level}]</span>
      </span>
    );
  }
  renderItem(combat, index) {
    const { hero, dispatch } = this.props;
    const { created, timeout, injury, warriors } = combat;

    const owner = warriors[0];
    const isOwner = owner.warrior === hero.id;
    const { inCombat } = hero;
    const firstTeam = warriors.filter(item => item.team === 1);
    const secondTeam = warriors.filter(item => item.team === 2);

    return (
      <li key={index}>
        <b>{moment(created).format('MMMM Do, hh:mm:ss')}</b>
        {' '}
        <i>Timeout: {timeout} sec, Injury: {injury}</i>
        {' '}
        {firstTeam.map(::this.renderHero)}
        {secondTeam.length ?
          <span>
            {' vs '}
            {secondTeam.map(::this.renderHero)}
          </span>
          : null}
        {isOwner && warriors.length > 1 ?
          <Button
            type="link"
            className="uk-icon-hover"
            size="mini"
            icon="check"
          /> : null}
        {isOwner && warriors.length === 1 ?
          <Button
            type="link"
            className="uk-icon-hover"
            size="mini"
            icon="close"
            onClick={() => dispatch(removeCombat(combat))}
          /> : null}

        {!isOwner && !inCombat && !warriors.find(item => item.warrior === hero.id) ?
          <Button
            type="link"
            className="uk-icon-hover"
            size="mini"
            icon="plus"
            onClick={() => dispatch(joinCombat(combat, 2, hero))}
          /> : null}

        {!isOwner && !inCombat && warriors.find(item => item.warrior === hero.id) ?
          <Button
            type="link"
            className="uk-icon-hover"
            size="mini"
            icon="minus"
            onClick={() => dispatch(leaveCombat(combat, hero))}
          /> : null}
      </li>
    );
  }
  render() {
    const { combats, type, dispatch } = this.props;

    return (
      <div>
        <Button
          className="uk-align-center"
          icon="refresh"
          onClick={() => dispatch(fetchCombats())}
        />
        {combats && combats.length ?
          <div className="uk-panel uk-panel-box uk-margin-top">
            <ul className="uk-list">
              {combats
                .sort((a, b) => a.created > b.created)
                .filter(item => item.type === type).map(::this.renderItem)}
            </ul>
          </div> : null}
      </div>
    );
  }
}


function select(state) {
  return {
    hero: state.hero,
    combats: state.combats,
  };
}

export default connect(select)(List);
