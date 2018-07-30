module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node":    true,
        "mocha":   true
    },
    
	"extends": [
    "eslint:recommended",
    "plugin:react/recommended"
    ],
	"parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "spread": true,
			"experimentalObjectRestSpread": true
        },
		
		ecmaVersion: 6,
        //"ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
		"no-console":"off",
        "accessor-pairs": "off",
        "array-bracket-newline": "off",
        "array-bracket-spacing": "off",
        "array-callback-return": "off",
        "array-element-newline": "off",
        "arrow-body-style": "off",
        "arrow-parens": [
            "off",
            "as-needed"
        ],
        "arrow-spacing": [
            "error",
            {
                "after": true,
                "before": true
            }
        ],
        "block-scoped-var": "off",
        "block-spacing": "off",
        "brace-style": [
            "off",
            "1tbs"
        ],
        "callback-return": "off",
        "camelcase": "off",
        "capitalized-comments": "off",
        "class-methods-use-this": "off",
        "comma-dangle": "off",
        "comma-spacing": [
            "off",
            {
                "after": true,
                "before": false
            }
        ],
        "comma-style": "off",
        "complexity": "off",
        "computed-property-spacing": "off",
        "consistent-return": "off",
        "consistent-this": "off",
        "curly": "off",
        "default-case": "off",
        "dot-location": [
            "off",
            "property"
        ],
        "dot-notation": [
            "off",
            {
                "allowKeywords": true
            }
        ],
        "eol-last": "off",
        "eqeqeq": "off",
        "func-call-spacing": "off",
        "func-name-matching": "off",
        "func-names": "off",
        "func-style": [
            "off",
            "declaration"
        ],
        "function-paren-newline": "off",
        "generator-star-spacing": "off",
        "global-require": "off",
        "guard-for-in": "off",
        "handle-callback-err": "off",
        "id-blacklist": "off",
        "id-length": "off",
        "id-match": "off",
        "implicit-arrow-linebreak": [
            "off",
            "beside"
        ],
        //"indent": "off",
		//"indent": ["error", "tab"],
		"indent": ["error", 2],
        "indent-legacy": "off",
        "init-declarations": "off",
        "jsx-quotes": [
            "off",
            "prefer-double"
        ],
        "key-spacing": "off",
        "keyword-spacing": [
            "off",
            {
                "after": true,
                "before": true
            }
        ],
        "line-comment-position": "off",
        "linebreak-style": [
            "off",
            "unix"
        ],
        "lines-around-comment": "off",
        "lines-around-directive": "off",
        "lines-between-class-members": "off",
        "max-classes-per-file": "off",
        "max-depth": "off",
        "max-len": "off",
        "max-lines": "off",
        "max-lines-per-function": "off",
        "max-nested-callbacks": "off",
        "max-params": "off",
        "max-statements": "off",
        "max-statements-per-line": "off",
        "multiline-comment-style": [
            "off",
            "separate-lines"
        ],
        "multiline-ternary": "off",
        "new-cap": "off",
        "new-parens": "off",
        "newline-after-var": "off",
        "newline-before-return": "off",
        "newline-per-chained-call": "off",
        "no-alert": "off",
        "no-array-constructor": "off",
        "no-await-in-loop": "off",
        "no-bitwise": "off",
        "no-buffer-constructor": "off",
        "no-caller": "off",
        "no-catch-shadow": "off",
        "no-confusing-arrow": "off",
        "no-continue": "off",
        "no-div-regex": "off",
        "no-duplicate-imports": "off",
        "no-else-return": "off",
        "no-empty-function": "off",
        "no-eq-null": "off",
        "no-eval": "off",
        "no-extend-native": "off",
        "no-extra-bind": "off",
        "no-extra-label": "off",
        "no-extra-parens": "off",
        "no-floating-decimal": "off",
        "no-implicit-coercion": "off",
        "no-implicit-globals": "off",
        "no-implied-eval": "off",
        "no-inline-comments": "off",
        "no-invalid-this": "off",
        "no-iterator": "off",
        "no-label-var": "off",
        "no-labels": "off",
        "no-lone-blocks": "off",
        "no-lonely-if": "off",
        "no-loop-func": "off",
        "no-magic-numbers": "off",
        "no-mixed-operators": "off",
        "no-mixed-requires": "off",
		"no-mixed-spaces-and-tabs": "off",
        "no-multi-assign": "off",
        "no-multi-spaces": "off",
        "no-multi-str": "off",
        "no-multiple-empty-lines": "off",
        "no-native-reassign": "off",
        "no-negated-condition": "off",
        "no-negated-in-lhs": "off",
        "no-nested-ternary": "off",
        "no-new": "off",
        "no-new-func": "off",
        "no-new-object": "off",
        "no-new-require": "off",
        "no-new-wrappers": "off",
        "no-octal-escape": "off",
        "no-param-reassign": "off",
        "no-path-concat": "off",
        "no-plusplus": "off",
        "no-process-env": "off",
        "no-process-exit": "off",
        "no-proto": "off",
        "no-prototype-builtins": "off",
        "no-restricted-globals": "off",
        "no-restricted-imports": "off",
        "no-restricted-modules": "off",
        "no-restricted-properties": "off",
        "no-restricted-syntax": "off",
        "no-return-assign": "off",
        "no-return-await": "off",
        "no-script-url": "off",
        "no-self-compare": "off",
        "no-sequences": "off",
        "no-shadow": "off",
        "no-shadow-restricted-names": "off",
        "no-spaced-func": "off",
        "no-sync": "off",
        "no-tabs": "off",
        "no-template-curly-in-string": "off",
        "no-ternary": "off",
        "no-throw-literal": "off",
        "no-trailing-spaces": "off",
        "no-undef-init": "off",
        "no-undefined": "off",
        "no-underscore-dangle": "off",
        "no-unmodified-loop-condition": "off",
        "no-unneeded-ternary": "off",
        "no-unused-expressions": "off",
        "no-use-before-define": "off",
        "no-useless-call": "off",
        "no-useless-computed-key": "off",
        "no-useless-concat": "off",
        "no-useless-constructor": "off",
        "no-useless-rename": "off",
        "no-useless-return": "off",
        "no-var": "off",
        "no-void": "off",
        "no-warning-comments": "off",
        "no-whitespace-before-property": "off",
        "no-with": "off",
        "nonblock-statement-body-position": "off",
        "object-curly-newline": "off",
		"no-unused-vars":"off",
        "object-curly-spacing": [
            "off",
            "always"
        ],
        "object-property-newline": "off",
        "object-shorthand": "off",
        "one-var": "off",
        "one-var-declaration-per-line": "off",
        "operator-assignment": "off",
        "operator-linebreak": "off",
        "padded-blocks": "off",
        "padding-line-between-statements": "off",
        "prefer-arrow-callback": "off",
        "prefer-const": "off",
        "prefer-destructuring": "off",
        "prefer-numeric-literals": "off",
        "prefer-object-spread": "off",
        "prefer-promise-reject-errors": "off",
        "prefer-reflect": "off",
        "prefer-rest-params": "off",
        "prefer-spread": "off",
        "prefer-template": "off",
        "quote-props": "off",
        "quotes": [
            "off",
            "single"
        ],
        "radix": "off",
        "require-await": "off",
        "require-jsdoc": "off",
        "rest-spread-spacing": "off",
        "semi": "off",
        "semi-spacing": "off",
        "semi-style": [
            "off",
            "last"
        ],
        "sort-imports": "off",
        "sort-keys": "off",
        "sort-vars": "off",
        "space-before-blocks": "off",
        "space-before-function-paren": "off",
        "space-in-parens": [
            "off",
            "never"
        ],
        "space-infix-ops": "off",
        "space-unary-ops": "off",
        "spaced-comment": [
            "off",
            "always"
        ],
        "strict": "off",
        "switch-colon-spacing": "off",
        "symbol-description": "off",
        "template-curly-spacing": [
            "off",
            "never"
        ],
        "template-tag-spacing": "off",
        "unicode-bom": [
            "off",
            "never"
        ],
        "valid-jsdoc": "off",
        "vars-on-top": "off",
        "wrap-iife": "off",
        "wrap-regex": "off",
        "yield-star-spacing": "off",
        "yoda": [
            "off",
            "never"
        ],
		
		 "react/prop-types": "off"
		
    },
    "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "^16.4.1", // React version, default to the latest React stable release
      "flowVersion": "0.53" // Flow version
	 
    },
    "propWrapperFunctions": [ "forbidExtraProps" ] // The names of any functions used to wrap the
                                                   // propTypes object, e.g. `forbidExtraProps`.
                                                   // If this isn't set, any propTypes wrapped in
                                                   // a function will be skipped.
  }
      
};