'use strict';

describe('FileSystemDirectoryEntry', function () {
	it('#createReader()', function () {
		assert.instanceOf(webdavRootDirectory.createReader(), webdav.FileSystemDirectoryReader);
	});

	it('#getFile()', async function () {
		assert.instanceOf(await new Promise(function (resolve, reject) {
			webdavRootDirectory.getFile('file', {create: true}, resolve, reject);
		}), webdav.FileSystemFileEntry);
	});

	it('#getDirectory()', async function () {
		assert.instanceOf(await new Promise(function (resolve, reject) {
			webdavRootDirectory.getDirectory('directory', {create: true}, resolve, reject);
		}), webdav.FileSystemDirectoryEntry);

		assert.instanceOf(await new Promise(function (resolve, reject) {
			webdavRootDirectory.getDirectory('directory', {}, resolve, reject);
		}), webdav.FileSystemDirectoryEntry);
	});

	it('#removeRecursively()', async function () {
		const directory = await new Promise(function (resolve, reject) {
			webdavRootDirectory.getDirectory('directory', {create: true}, resolve, reject);
		});

		await new Promise(function (resolve, reject) {
			directory.getDirectory('child-directory', {create: true}, resolve, reject);
		});

		await fetch(directory.fullPath + '/child-file', {method: 'PUT'});

		await new Promise(function (resolve, reject) {
			directory.removeRecursively(resolve, reject);
		});
	});
});
