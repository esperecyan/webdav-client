'use strict';

describe('FileSystemDirectoryReader', function () {
	it('#readEntries()', async function () {
		await fetch(webdavRootDirectory.fullPath + '/file', {method: 'PUT'});
		await new Promise(function (resolve, reject) {
			webdavRootDirectory.getDirectory('directory', {create: true}, resolve, reject);
		});

		const reader = webdavRootDirectory.createReader();
		const entries = await new Promise(function (resolve, reject) {
			reader.readEntries(resolve, reject);
		});

		assert.lengthOf(entries, 2);
		assert.strictEqual(entries.find(entry => entry.isFile).name, 'file');
		assert.strictEqual(entries.find(entry => entry.isDirectory).name, 'directory');
	});
});
