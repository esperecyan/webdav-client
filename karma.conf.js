// Karma configuration
// Generated on Tue Jan 30 2018 07:03:26 GMT+0900 (東京 (標準時))

/*eslint-env node */

'use strict';

module.exports = function (config) {
	config.set({
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai'],

		// list of files / patterns to load in the browser
		files: [
			'webdav.es',
			'tests/*.es',
		],

		// list of files / patterns to exclude
		exclude: [
			'tests/test.es',
		],

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['FirefoxHeadless', 'Chrome'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,
	});
};
