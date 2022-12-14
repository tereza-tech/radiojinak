'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = function (_Component) {
  _inherits(Element, _Component);

  function Element() {
    _classCallCheck(this, Element);

    var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));

    _this.schema = _this.getSchema();
    _this.privateProps = Object.keys(_this.schema).reduce(function (acc, key) {
      return acc.concat(_this.schema[key].inputs);
    }, []).concat(['component', 'transform']).concat(_this.getPrivateProps());
    return _this;
  }

  _createClass(Element, [{
    key: 'getPrivateProps',
    value: function getPrivateProps() {
      return [];
    }
  }, {
    key: 'getSchema',
    value: function getSchema() {
      return {};
    }
  }, {
    key: 'getDerivedAttrs',
    value: function getDerivedAttrs() {
      var _this2 = this;

      return Object.keys(this.schema).reduce(function (acc, key) {
        return _extends({}, acc, _defineProperty({}, key, _this2.schema[key].calculation(_this2.props)));
      }, {});
    }
  }, {
    key: 'getTransformations',
    value: function getTransformations() {
      var env = this.context.env || 'web';
      var transform = this.props.transform;


      if (!transform) return {};

      switch (env) {
        case 'web':
        default:
          {
            return {
              transform: (0, _util.getTransformations)(transform)
            };
          }
        case 'react-native-svg':
          {
            return (0, _util.getRNSvgTransformations)(transform);
          }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultComponent = this.defaultComponent;
      var _props = this.props,
          component = _props.component,
          components = _props.components;

      var the = {
        component: component || (0, _lodash2.default)(components, defaultComponent) || (0, _lodash2.default)(this, 'context.components.' + defaultComponent) || defaultComponent
      };
      return _react2.default.createElement(
        the.component,
        _extends({}, this.getDerivedAttrs(), (0, _util.omit)(this.props, this.privateProps), this.getTransformations()),
        this.props.children
      );
    }
  }]);

  return Element;
}(_react.Component);

Element.propTypes = {
  children: _propTypes2.default.node,
  transform: _propTypes2.default.object,
  component: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),
  components: _util.types.components
};
Element.contextTypes = {
  components: _util.types.components,
  env: _propTypes2.default.oneOf(['web', 'react-native-svg'])
};
exports.default = Element;