'use strict';

exports.__esModule = true;
exports['default'] = jssNested;
var regExp = /&/gi;

/**
 * Convert nested rules to separate, remove them from original styles.
 *
 * @param {Rule} rule
 * @api private
 */

function jssNested(rule) {
  var style = rule.style;

  for (var prop in style) {
    if (prop[0] === '&') {
      var selector = prop.replace(regExp, rule.selector);
      rule.addChild(selector, style[prop], { named: false });

      delete style[prop];
    }
  }
}

module.exports = exports['default'];