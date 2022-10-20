import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import {
  omit,
  getTransformations,
  getRNSvgTransformations,
  types,
} from '../utils';

export default class Element extends Component {

  static propTypes = {
    children: PropTypes.node,
    transform: PropTypes.object,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    components: types.components,
  }

  static contextTypes = {
    components: types.components,
    env: PropTypes.oneOf(['web', 'react-native-svg']),
  }

  constructor() {
    super();
    this.schema = this.getSchema();
    this.privateProps = Object.keys(this.schema)
      .reduce((acc, key) =>
        acc.concat(this.schema[key].inputs)
      , [])
      .concat(['component', 'transform'])
      .concat(this.getPrivateProps());
  }

  getPrivateProps() {
    return [];
  }

  getSchema() {
    return {};
  }

  getDerivedAttrs() {
    return Object.keys(this.schema).reduce((acc, key) => ({
      ...acc,
      [key]: this.schema[key].calculation(this.props),
    }), {});
  }

  getTransformations() {
    const env = this.context.env || 'web';
    const { transform } = this.props;

    if (!transform) return {};

    switch (env) {
      case 'web':
      default: {
        return {
          transform: getTransformations(transform),
        };
      }
      case 'react-native-svg': {
        return getRNSvgTransformations(transform);
      }
    }
  }

  render() {
    const { defaultComponent } = this;
    const { component, components } = this.props;
    const the = {
      component: component ||
        get(components, defaultComponent) ||
        get(this, `context.components.${defaultComponent}`) ||
        defaultComponent,
    };
    return (
      <the.component
        {...this.getDerivedAttrs()}
        {...omit(this.props, this.privateProps)}
        {...this.getTransformations()}
      >
        {this.props.children}
      </the.component>
    );
  }
}