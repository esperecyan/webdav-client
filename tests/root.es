'use strict';

let webdavRootDirectory;

{
	let root;
	before(async function () {
		root = await new Promise(function (resolve, reject) {
			webdav.root.getDirectory(new URL('/webdav/', location).toString(), {create: true}, resolve, reject);
		});
	});

	beforeEach(async function () {
		webdavRootDirectory = await new Promise(function (resolve, reject) {
			root.getDirectory(Math.random().toString(), {create: true}, resolve, reject);
		});
	});

	afterEach(async function () {
		await new Promise(function (resolve, reject) {
			webdavRootDirectory.removeRecursively(resolve, reject);
		});
	});
}
