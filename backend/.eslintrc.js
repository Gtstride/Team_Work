module.exports = 
{
  "rules": {
      "no-console": 0,
      "no-restricted-syntax": "off",
  },
  "env": {
		"node": true,
		"browser": true,
		"es6": true
	},
	"parser": "babel-eslint",
	"extends": [
		"airbnb-base",
		"plugin:import/errors",
		"plugin:import/warnings"
	]
  
};

