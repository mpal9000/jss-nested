'use strict'

QUnit.module('Nested rules plugin', {
    setup: function () {
        jss.use(jssNested)
    },
    teardown: function () {
        jss.plugins.registry = []
    }
})

test('nesting with space', function () {
    var ss = new jss.StyleSheet({
        a: {
            float: 'left',
            '& b': {float: 'left'}
        }
    }, {named: false})
    ok(ss.rules.a instanceof jss.Rule)
    ok(ss.rules['a b'] instanceof jss.Rule)
    equal(ss.toString(), 'a {\n  float: left;\n}\na b {\n  float: left;\n}')
})

test('nesting without space', function () {
    var ss = new jss.StyleSheet({
        a: {
            float: 'left',
            '&b': {float: 'left'}
        }
    }, {named: false})
    ok(ss.rules.a instanceof jss.Rule)
    ok(ss.rules['ab'] instanceof jss.Rule)
    equal(ss.toString(), 'a {\n  float: left;\n}\nab {\n  float: left;\n}')
})

test('multi nesting', function () {
    var ss = new jss.StyleSheet({
        a: {
            float: 'left',
            '&b': {float: 'left'},
            '& c': {float: 'left'}
        }
    }, {named: false})
    ok(ss.rules.a instanceof jss.Rule)
    ok(ss.rules.ab instanceof jss.Rule)
    ok(ss.rules['a c'] instanceof jss.Rule)
    equal(ss.toString(), 'a {\n  float: left;\n}\nab {\n  float: left;\n}\na c {\n  float: left;\n}')
})

test('multi nesting in one selector', function () {
    var ss = new jss.StyleSheet({
        a: {
            float: 'left',
            '&b, &c': {float: 'left'}
        }
    }, {named: false})
    ok(ss.rules.a instanceof jss.Rule)
    ok(ss.rules['ab, ac'] instanceof jss.Rule)
    equal(ss.toString(), 'a {\n  float: left;\n}\nab, ac {\n  float: left;\n}')
})


test('deep nesting', function () {
    var ss = new jss.StyleSheet({
        a: {
            '&b': {
                '&c': {
                    float: 'left'
                }
            }
        }
    }, {named: false})
    ok(ss.rules.a instanceof jss.Rule)
    ok(ss.rules.ab instanceof jss.Rule)
    ok(ss.rules.abc instanceof jss.Rule)
    equal(ss.toString(), 'a {\n}\nab {\n}\nabc {\n  float: left;\n}')
})

test('addRules', function () {
    var ss = new jss.StyleSheet({
        a: {
            height: '1px'
        }
    }, {named: false}).attach()

    ss.addRules({
        b: {
            height: '2px',
            '& c': {
                height: '3px'
            }
        }
    })

    equal(ss.element.sheet.rules[0].cssText, 'a { height: 1px; }')
    equal(ss.element.sheet.rules[1].cssText, 'b { height: 2px; }')
    equal(ss.element.sheet.rules[2].cssText, 'b c { height: 3px; }')
    ss.detach()
})

test('nesting in a namespaced rule', function () {
    jss.Rule.uid = 0
    var ss = new jss.StyleSheet({
        a: {
            float: 'left',
            '& b': {float: 'left'}
        }
    })
    ok(ss.rules['.jss-0'] instanceof jss.Rule)
    ok(ss.rules['.jss-0 b'] instanceof jss.Rule)
    equal(ss.toString(), '.jss-0 {\n  float: left;\n}\n.jss-0 b {\n  float: left;\n}')
})
