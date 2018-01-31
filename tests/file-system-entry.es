'use strict';

describe('FileSystemEntry', function () {
	it('#getParent()', async function () {
		const childFile = await new Promise(function (resolve, reject) {
			webdavRootDirectory.getFile('file', {create: true}, resolve, reject);
		});
		assert.strictEqual((await new Promise(function (resolve, reject) {
			childFile.getParent(resolve, reject);
		})).fullPath, webdavRootDirectory.fullPath);

		const childDirectory = await new Promise(function (resolve, reject) {
			webdavRootDirectory.getDirectory('directory', {create: true}, resolve, reject);
		});
		assert.strictEqual((await new Promise(function (resolve, reject) {
			childDirectory.getParent(resolve, reject);
		})).fullPath, webdavRootDirectory.fullPath);
	});

	it('#getMetadata()', async function () {
		const directory = await new Promise(function (resolve, reject) {
			webdav.root.getDirectory(webdavRootDirectory.fullPath, {}, resolve, reject);
		});
		const directoryMetadata = await new Promise(function (resolve, reject) {
			directory.getMetadata(resolve, reject);
		});
		assert.instanceOf(directoryMetadata.modificationTime, Date);
		assert.strictEqual(directoryMetadata.size, 0);

		const previousResponse = await fetch(webdavRootDirectory.fullPath + '/file', {method: 'PUT', body: 'foo'});
		assert.isTrue(previousResponse.ok, previousResponse.status + ' ' + previousResponse.statusText);
		const previousFile = await new Promise(function (resolve, reject) {
			webdavRootDirectory.getFile('file', {}, resolve, reject);
		});

		await fetch(webdavRootDirectory.fullPath + '/file', {method: 'PUT', body: 'bar'});
		const file = await new Promise(function (resolve, reject) {
			webdav.root.getFile(previousFile.fullPath, {}, resolve, reject);
		});

		const previousFileMetadata = await new Promise(function (resolve, reject) {
			previousFile.getMetadata(resolve, reject);
		});
		const fileMetadata = await new Promise(function (resolve, reject) {
			file.getMetadata(resolve, reject);
		});
		assert.strictEqual(fileMetadata.size, 3);
		assert.notEqual(fileMetadata.eTag, previousFileMetadata.eTag);
	});

	it('#remove()', async function () {
		const directory = await new Promise(function (resolve, reject) {
			webdavRootDirectory.getDirectory('directory', {create: true}, resolve, reject);
		});
		await new Promise(function (resolve, reject) {
			directory.remove(resolve, reject);
		});

		await fetch(webdavRootDirectory.fullPath + '/file', {method: 'PUT', body: 'foo'});
		assert.strictEqual(await (await fetch(webdavRootDirectory.fullPath + '/file')).text(), 'foo');

		const file = await new Promise(function (resolve, reject) {
			webdavRootDirectory.getFile('file', {create: true}, resolve, reject);
		});
		await new Promise(function (resolve, reject) {
			file.remove(resolve, reject);
		});
		assert.strictEqual((await fetch(webdavRootDirectory.fullPath + '/file')).status, 404);
	});
});
