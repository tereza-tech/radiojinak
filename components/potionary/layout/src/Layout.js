import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionMotion, spring } from 'react-motion';
import itsSet from 'its-set';
import get from 'lodash.get';

import { isObject, types } from '@potion/util';

export default class Layout extends Component {

  static displayName = 'Layout';

  static propTypes = {
    children: PropTypes.func.isRequired,
    nodeEnter: PropTypes.func,
    nodeExit: PropTypes.func,
    animate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    springStiffness: PropTypes.number,
    springDamping: PropTypes.number,
    interpolate: PropTypes.func,
  };

  static defaultProps = {
    animate: false,
    nodeEnter: d => d,
    nodeExit: d => d,
    springStiffness: 170,
    springDamping: 26,
    interpolate: () => ({}),
  };

  static contextTypes = {
    components: types.components,
  }

  constructor() {
    super();
    this.schema = this.getSchema();
    this.getEnterStyle = this.getEnterStyle.bind(this);
    this.getExitStyle = this.getExitStyle.bind(this);
  }

  getEnterStyle({ style }) {
    const result = { ...style, ...this.props.interpolate(style), ...this.props.nodeEnter(style) };
    return Object.keys(result).reduce((acc, key) => ({
      ...acc,
      [key]: isObject(result[key]) ? result[key].val : result[key],
    }), {});
  }

  getExitStyle({ style }) {
    const result = { ...style, ...this.props.interpolate(style), ...this.props.nodeExit(style) };

    return Object.keys(result).reduce((acc, key) => ({
      ...acc,
      [key]: isObject(result[key]) ? result[key].val : result[key],
    }), {});
  }

  getLayout() {
    const { layout, layoutProps } = this.schema;
    let p = layout();
    layoutProps.forEach((key) => {
      if (itsSet(this.props[key])) p = p[key](this.props[key]);
    });
    return p;
  }

  getAnimatedData() {
    return this.getData().map(d => ({
      key: d.key || d.data.key,
      data: d,
      style: { ...this.props.interpolate(d), ...this.schema.selectStylesToTween(d) },
    }));
  }

  getStaticData() {
    return this.getData();
  }

  defaultComponent='g'

  transformDefaultStyles(data) {
    return data.map(d => ({ ...d, style: this.props.nodeEnter(d.style) }));
  }

  transformStyles(data) {
    return data.map(d => ({
      ...d,
      style: Object.keys(d.style)
        .reduce((acc, key) => ({
          ...acc,
          [key]: spring(d.style[key], {
            stiffness: this.props.springStiffness,
            damping: this.props.springDamping,
          }),
        }), {}),
    }));
  }

  transformInterpolatedStyles(data) {
    return data.map(d => {
      const { data, style, key } = d;
      return {
        key,
        ...Object.getOwnPropertyNames(data).reduce((acc, key) => ({
          ...acc,
          [key]: data[key],
        }), {}),
        ...style,
      };
    });
  }

  renderAnimated() {
    const data = this.getAnimatedData();
    return (
      <TransitionMotion
        defaultStyles={this.transformDefaultStyles(data)}
        styles={this.transformStyles(data)}
        willEnter={this.getEnterStyle}
        willLeave={this.getExitStyle}
      >
        {interpolatedStyles => this.renderChildren(
          this.transformInterpolatedStyles(interpolatedStyles)
        )}
      </TransitionMotion>
    );
  }

  renderStatic() {
    return this.renderChildren(this.getStaticData());
  }

  renderChildren(data) {
    const { defaultComponent } = this;
    const the = {
      component: this.props.component ||
        get(this, `context.components.${defaultComponent}`) ||
        defaultComponent,
    };
    return (
      <the.component>
        {this.props.children(data)}
      </the.component>
    );
  }

  render() {
    return this.props.animate ? this.renderAnimated() : this.renderStatic();
  }
}