/*eslint-env node */

'use strict';

const karma = require('karma');
const webdav = require('webdav-server').v2;

const webdavServer = new webdav.WebDAVServer();
webdavServer.start();

new karma.Server({
	configFile: module.filename + '/../../karma.conf.js',
	proxies: {'/webdav/': `http://localhost:${webdavServer.options.port}/webdav/`},
}, function (exitCode) {
	webdavServer.stop();
	process.exit(exitCode);
}).start();
