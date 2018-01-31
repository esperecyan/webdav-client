'use strict';

describe('FileWriter', function () {
	it('#write()', async function () {
		const file = await new Promise(function (resolve, reject) {
			webdavRootDirectory.getFile('file', {create: true}, resolve, reject);
		});

		const writer = await new Promise(function (resolve, reject) {
			file.createWriter(resolve, reject);
		});

		await new Promise(function (resolve, reject) {
			writer.onwrite = function () {
				resolve();
			};
			writer.onerror = function () {
				reject(writer.error);
			};
			writer.write(new Blob(['foo']));
		});

		assert.strictEqual(await (await fetch(webdavRootDirectory.fullPath + '/file')).text(), 'foo');
	});
});
