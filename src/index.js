const regExp = /&/gi

/**
 * Convert nested rules to separate, remove them from original styles.
 *
 * @param {Rule} rule
 * @api private
 */
export default function jssNested(rule) {
  const style = rule.style

  for (let prop in style) {
    if (prop[0] === '&') {
      const selector = prop.replace(regExp, rule.selector)
      rule.addChild(selector, style[prop], {named: false})

      delete style[prop]
    }
  }
}
