'use strict';

describe('FileSystemFileEntry', function () {
	it('#createWriter()', async function () {
		const file = await new Promise(function (resolve, reject) {
			webdavRootDirectory.getFile('file', {create: true}, resolve, reject);
		});

		assert.instanceOf(await new Promise(function (resolve, reject) {
			file.createWriter(resolve, reject);
		}), webdav.FileWriter);
	});

	it('#file()', async function () {
		await fetch(webdavRootDirectory.fullPath + '/file', {method: 'PUT', body: 'foo'});
		const file = await new Promise(function (resolve, reject) {
			webdavRootDirectory.getFile('file', {}, resolve, reject);
		});

		assert.strictEqual(await new Response(await new Promise(function (resolve, reject) {
			file.file(resolve, reject);
		})).text(), 'foo');
	});
});
