/**
 * @file <b>esperecyan-webdav-client</b> is the WebDAV client library
 *      which is designed like [File and Directory Entries API]{@link https://wicg.github.io/entries-api/}.
 * @version 2.0.2
 * @see [File and Directory Entries API — Web APIs | MDN]{@link
 *      https://developer.mozilla.org/docs/Web/API/File_and_Directory_Entries_API}
 * @license MPL-2.0
 * @author 100の人
 * @see {@link https://github.com/esperecyan/webdav-client}
 */

'use strict';

/**
 * The DOMException interface represents an abnormal event (called an exception)
 * which occurs as a result of calling a method or accessing a property of a web API.
 * @external DOMException
 * @see [DOMException — Web APIs | MDN]{@link https://developer.mozilla.org/ja/docs/Web/API/DOMException}
 * @see [4.3. DOMException | Web IDL]{@link https://heycam.github.io/webidl/#idl-DOMException}
 */

/**
 * An ErrorCallback function is used for operations that may return an error asynchronously.
 * @external ErrorCallback
 * @see [ErrorCallback | File and Directory Entries API]{@link
 *      https://wicg.github.io/entries-api/#callbackdef-errorcallback}
 */

/**
 * This interface is the generic callback used to indicate success of an asynchronous method.
 * @external VoidCallback
 * @see [6.6.7 The VoidCallback interface | File and Directory Entries API]{@link
 *      https://www.w3.org/TR/2012/WD-file-system-api-20120417/#the-voidcallback-interface}
 */

/**
 * This interface is the generic callback used to indicate success of an asynchronous method.
 * @external FileSystemFlags
 * @see [FileSystemFlags — Web APIs | MDN]{@link https://developer.mozilla.org/docs/Web/API/FileSystemFlags}
 * @see [FileSystemFlags | 7.2. The FileSystemDirectoryEntry Interface | File and Directory Entries API]{@link
 *      https://wicg.github.io/entries-api/#dictdef-filesystemflags}
 */

/**
 * @external FileCallback
 * @see [FileCallback | 7.4. The FileSystemFileEntry Interface | File and Directory Entries API]{@link
 *      https://wicg.github.io/entries-api/#callbackdef-filecallback}
 */

/**
 * The File interface provides information about files and allows JavaScript in a web page to access their content.
 * @external File
 * @see [File — Web APIs | MDN]{@link https://developer.mozilla.org/docs/Web/API/File}
 * @see [4. The File Interface | File API]{@link https://www.w3.org/TR/FileAPI/#file-section}
 */

/** @namespace */
const webdav = {};

/**
 * The Metadata interface is used by the File and Directory Entries API
 * to contain information about a file system entry.
 *
 * @typedef {Object} webdav.Metadata
 * @see [Metadata — Web APIs | MDN]{@link https://developer.mozilla.org/docs/Web/API/Metadata}
 * @see [5.1 The Metadata interface | File API: Directories and System]{@link
 *      https://www.w3.org/TR/2012/WD-file-system-api-20120417/#the-metadata-interface}
 * @property {Date} modificationTime
 * @property {number} size
 * @property {string} eTag
 */

/**
 * This interface is the callback used to look up file and directory metadata.
 * @callback webdav.MetadataCallback
 * @see [6.6.4 The MetadataCallback interface | File API: Directories and System]{@link
 *      https://www.w3.org/TR/2012/WD-file-system-api-20120417/#the-metadatacallback-interface}
 * @param {webdav.Metadata} metadata
 * @returns {void}
 * @property {Function} [handleEvent]
 */

/**
 * @callback webdav.FileSystemEntryCallback
 * @see [FileSystemEntryCallback  | 7.2. The FileSystemDirectoryEntry Interface | File and Directory Entries API]{@link
 *      https://wicg.github.io/entries-api/#callbackdef-filesystementrycallback}
 * @param {webdav.FileSystemEntry} entry
 * @returns {void}
 * @property {Function} [handleEvent]
 */

/**
 * @callback webdav.FileSystemEntriesCallback
 * @see [FileSystemEntriesCallback | 7.3. The FileSystemDirectoryReader Interface | File and Directory Entries API]{@link https://wicg.github.io/entries-api/#callbackdef-filesystementriescallback}
 * @param {webdav.FileSystemEntry[]} entries
 * @returns {void}
 * @property {Function} [handleEvent]
 */

/**
 * This interface is the callback used to create a {@link webdav.FileWriter}.
 * @callback webdav.FileWriterCallback
 * @see [6.6.5 The FileWriterCallback interface | File API: Directories and System]{@link
 *      https://www.w3.org/TR/2012/WD-file-system-api-20120417/#the-filewritercallback-interface}
 * @param {webdav.FileWriter} fileWriter
 * @returns {void}
 * @property {Function} [handleEvent]
 */

/**
 * The basic interface representing a single entry in a file system.
 * This is implemented by other interfaces which represent files or directories.
 * @see [FileSystemEntry — Web APIs | MDN]{@link https://developer.mozilla.org/docs/Web/API/FileSystemEntry}
 */
webdav.FileSystemEntry = class {
	/**
	 * @hideconstructor
	 * @param {Object} params
	 * @param {string} params.fullPath
	 * @param {?webdav.Metadata} [params.metadata]
	 */
	constructor({fullPath, metadata = null})
	{
		/**
		 * A Boolean which is `true` if the entry represents a file. If it’s not a file, this value is `false`.
		 * @see [FileSystemEntry.isFile — Web APIs | MDN]{@link
		 *      https://developer.mozilla.org/docs/Web/API/FileSystemEntry/isFile}
		 * @readonly
		 * @type {boolean}
		 */
		this.isFile = false;

		/**
		 * A Boolean which is `true` if the entry represents a directory; otherwise, it’s `false`.
		 * @see [FileSystemEntry.isDirectory — Web APIs | MDN]{@link
		 *      https://developer.mozilla.org/docs/Web/API/FileSystemEntry/isDirectory}
		 * @readonly
		 * @type {boolean}
		 */
		this.isDirectory = false;

		/**
		 * A USVString containing the name of the entry (the final part of the path, after the last “/” character).
		 * @see [FileSystemEntry.name — Web APIs | MDN]{@link
		 *      https://developer.mozilla.org/docs/Web/API/FileSystemEntry/name}
		 * @readonly
		 * @type {string}
		 */
		this.name = decodeURIComponent(/([^/]*)\/?$/.exec(fullPath)[1]);

		/**
		 * An absolute-URL string.
		 * @see [FileSystemEntry.fullPath — Web APIs | MDN]{@link
		 *      https://developer.mozilla.org/docs/Web/API/FileSystemEntry/fullPath}
		 * @readonly
		 * @type {string}
		 */
		this.fullPath = fullPath;

		/**
		 * @access private
		 * @type {?webdav.Metadata}
		 */
		this.metadata = metadata;
	}

	/**
	 * Returns a {@link webdav.FileSystemDirectoryEntry} representing the entry’s parent directory.
	 * @see [FileSystemEntry.getParent() — Web APIs | MDN]{@link
	 *      https://developer.mozilla.org/docs/Web/API/FileSystemEntry/getParent}
	 * @param {webdav.FileSystemEntryCallback} [successCallback]
	 *      A function which is called when the parent directory entry has been retrieved.
	 *      The callback receives a single input parameter:
	 *      a {@link webdav.FileSystemDirectoryEntry} object representing the parent directory.
	 *      The parent of the root directory is considered to be the root directory, itself,
	 *      so be sure to watch for that.
	 * @param {external:ErrorCallback} [errorCallback] - An optional callback which is executed if an error occurs.
	 *      There’s a single parameter: a {@link external:DOMException} describing what went wrong.
	 * @returns {void}
	 */
	getParent(successCallback = () => {}, errorCallback = () => {})
	{
		if (this.fullPath === '') {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException('The directory is associated with the root of the file system.', 'NotSupportedError')
			);
		} else {
			const url = new URL('.', this.fullPath.replace(/\/$/, ''));
			const client = new XMLHttpRequest();
			client.open('PROPFIND', url);
			client.setRequestHeader('content-type', 'application/xml; charset=UTF-8');
			client.setRequestHeader('depth', '0');
			client.responseType = 'document';
			client.addEventListener('error', function () {
				(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
					new DOMException(`NetworkError when attempting to fetch an entry <${url}>.`, 'NotFoundError')
				);
			});
			client.addEventListener('load', function (event) {
				let entry, err;

				if (event.target.status === 207) {
					if (event.target.response.getElementsByTagNameNS('DAV:', 'collection')[0]) {
						entry = new webdav.FileSystemDirectoryEntry({fullPath: event.target.responseURL, metadata: {
							modificationTime: new Date(
								event.target.response.getElementsByTagNameNS('DAV:', 'getlastmodified')[0].textContent
							),
							size: 0,
							eTag: event.target.response.getElementsByTagNameNS('DAV:', 'getetag')[0].textContent,
						}});
					} else {
						err = new DOMException(`<${url}> is a file, not a directory.`, 'TypeMismatchError');
					}
				} else {
					err = new DOMException(`${event.target.status} ${event.target.statusText}`, 'NotFoundError');
				}

				if (entry) {
					(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)(entry);
				} else {
					(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(err);
				}
			});
			client.send(`<?xml version="1.0" encoding="UTF-8"?>
				<propfind xmlns="DAV:">
					<prop>
						<resourcetype />
						<getlastmodified />
						<getcontentlength />
						<getetag />
					</prop>
				</propfind>`);
		}
	}

	/**
	 * Obtains metadata about the file, such as its modification date and size.
	 * @see [FileSystemEntry.getMetadata() — Web APIs | MDN]{@link
	 *      https://developer.mozilla.org/docs/Web/API/FileSystemEntry/getMetadata}
	 * @see [File API: Directories and System]{@link
	 *      https://www.w3.org/TR/2012/WD-file-system-api-20120417/#the-entry-interface}
	 * @param {webdav.MetadataCallback} successCallback
     *      A function which is called when looking up the metadata is succesfully completed.
	 *      Receives a single input parameter: a {@link webdav.Metadata} object with information about the file.
	 *      **This is information at the time of the instance of {@link wevdav.FileSystemEntry} created.**
	 * @param {external:ErrorCallback} [errorCallback]
	 *      An optional callback which is executed if an error occurs while looking up the metadata.
	 *      There’s a single parameter: a {@link external:DOMException} describing what went wrong.
	 * @returns {void}
	 */
	getMetadata(successCallback, errorCallback = () => {})
	{
		if (this.metadata) {
			(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)(
				Object.assign({}, this.metadata)
			);
		} else {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException(`This entry <${this.fullPath}> does not have metadata.`, 'NotSupportedError')
			);
		}
	}

	/**
	 * Removes the specified file or directory. You can only remove directories which are empty.
	 * @see [FileSystemEntry.remove() — Web APIs | MDN]{@link
	 *      https://developer.mozilla.org/docs/Web/API/FileSystemEntry/remove}
	 * @see [File API: Directories and System]{}@link
	 *      https://www.w3.org/TR/2012/WD-file-system-api-20120417/#the-entry-interface}
	 * @param {external:VoidCallback} successCallback
	 *      A function which is called once the file has been successfully removed.
	 * @param {external:ErrorCallback} [errorCallback]
	 *      An optional callback which is called if the attempt to remove the file fails.
	 * @returns {void}
	 */
	remove(successCallback, errorCallback = () => {})
	{
		(async () => {
			if (this.fullPath === '') {
				return Promise.reject(new DOMException(
					'The directory associated with the root of the file system can not be removed.',
					'NotSupportedError'
				));
			}

			if (this.isDirectory) {
				const entries = await new Promise((resolve, reject) => {
					this.createReader().readEntries(resolve, reject);
				});

				if (entries.length > 0) {
					return Promise.reject(
						new DOMException(`This directory <${this.fullPath}> is not empty.`, 'InvalidModificationError')
					);
				}
			}

			const response = await fetch(this.fullPath, {method: 'DELETE'});
			if (response.ok) {
				(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)();
			} else {
				return Promise.reject(new DOMException(
					`${response.status} ${response.statusText}`,
					response.status === 404 ? 'NotFoundError' : 'TypeMismatchError'
				));
			}
		})().catch(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent);
	}
};

/**
 * Represents a single directory in a file system.
 * @see [FileSystemDirectoryEntry — Web APIs | MDN]{@link
 *      https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryEntry}
 */
webdav.FileSystemDirectoryEntry = class extends webdav.FileSystemEntry {
	/** @inheritdoc */
	constructor(...args)
	{
		super(...args);
		this.isDirectory = true;
	}

	/**
	 * Creates
	 * a {@link webdav.FileSystemDirectoryReader} object which can be used to read the entries in this directory.
	 * @see [FileSystemDirectoryEntry.createReader() — Web APIs | MDN]{@link
	 *      https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryEntry/createReader}
	 * @returns {webdav.FileSystemDirectoryReader}
	 *      A {@link webdav.FileSystemDirectoryReader} object which can be used to read the directory’s entries.
	 */
	createReader()
	{
		return new webdav.FileSystemDirectoryReader({directoryEntry: this});
	}

	/**
	 * Returns a {@link webdav.FileSystemFileEntry} object representinga file located
	 * within the directory’s hierarchy, given a path relative to the directory on which the method is called.
	 * @see [FileSystemDirectoryEntry.getFile() — Web APIs | MDN]{@link
	 *      https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryEntry/getFile}
	 * @param {?string} [path] - A `USVString` specifying the path,
	 *      relative to the directory on which the method is called, describing which file’s entry to return.
	 * @param {external:FileSystemFlags} [options]
	 *      An object based on the {@link external:FileSystemFlags} dictionary, which allows you to specify
	 *      whether or not to create the entry if it’s missing and if it’s an error if the file already exists.
	 *      **This method returns dummy instance instead of creating an empty file.**
	 * @param {webdav.FileSystemEntryCallback} [successCallback]
	 *      A method to be called once the {@link webdav.FileSystemFileEntry} has been created.
	 *      The method receives a single parameter:
	 *      the {@link webdav.FileSystemFileEntry} object representing the file in question.
	 * @param {external:ErrorCallback} [errorCallback] - A method to be called if an error occurs. Receives
	 *      as its sole input parameter a {@link external:DOMException} object describing the error which occurred.
	 * @returns {void}
	 */
	getFile(path = '', {create = false, exclusive = false} = {}, successCallback = () => {}, errorCallback = () => {})
	{
		let url;
		let typeError;
		try {
			url = this.fullPath ? new URL(path, this.fullPath) : new URL(path);
		} catch (exception) {
			if (exception instanceof TypeError) {
				typeError = exception;
			} else {
				throw exception;
			}
		}

		if (typeError || !/^https?:\/\/[^?#]+[^/?#]$/.test(url)) {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(new DOMException(
				typeError || `<${url}> does not match supported URL patterns that the scheme is “https” or “http”,`
					+ ' the path does not end with “/”, and neither a query nor a fragment exist.',
				'TypeMismatchError'
			));
			return;
		}

		const client = new XMLHttpRequest();
		client.open('PROPFIND', url);
		client.setRequestHeader('content-type', 'application/xml; charset=UTF-8');
		client.setRequestHeader('depth', '0');
		client.responseType = 'document';
		client.addEventListener('error', function () {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException(`NetworkError when attempting to fetch an entry <${url}>.`, 'NotFoundError')
			);
		});
		client.addEventListener('load', function (event) {
			let entry, err;

			if (event.target.status === 207) {
				if (create && exclusive) {
					err = new DOMException(`<${url}> already exists.`, 'PathExistsError');
				} else if (!event.target.response.getElementsByTagNameNS('DAV:', 'collection')[0]) {
					entry = new webdav.FileSystemFileEntry({fullPath: event.target.responseURL, metadata: {
						modificationTime: new Date(
							event.target.response.getElementsByTagNameNS('DAV:', 'getlastmodified')[0].textContent
						),
						size: Number.parseInt(
							event.target.response.getElementsByTagNameNS('DAV:', 'getcontentlength')[0].textContent
						),
						eTag: event.target.response.getElementsByTagNameNS('DAV:', 'getetag')[0].textContent,
					}});
				} else {
					err = new DOMException(`<${url}> is a directory, not a file.`, 'TypeMismatchError');
				}
			} else if (event.target.status === 404 && create) {
				entry = new webdav.FileSystemFileEntry({fullPath: event.target.responseURL});
			} else {
				err = new DOMException(`${event.target.status} ${event.target.statusText}`, 'NotFoundError');
			}

			if (entry) {
				(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)(entry);
			} else {
				(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(err);
			}
		});
		client.send(`<?xml version="1.0" encoding="UTF-8"?>
			<propfind xmlns="DAV:">
				<prop>
					<resourcetype />
					<getlastmodified />
					<getcontentlength />
					<getetag />
				</prop>
			</propfind>`);
	}

	/**
	 * Returns a {@link webdav.FileSystemDirectoryEntry} object
	 * representing a directory located at a given path, relative to the directory on which the method is called.
	 * @see [FileSystemDirectoryEntry.getDirectory() — Web APIs | MDN]{@link
	 *      https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryEntry/getDirectory}
	 * @param {?string} [path] - A USVString representing an absolute path or a path relative to the directory
	 *      on which the method is called, describing which directory entry to return.
	 * @param {external:FileSystemFlags} [options]
	 *      An object based on the {external:FileSystemFlags} dictionary, which allows you to specify
	 *      whether or not to create the entry if it's missing and if it's an error if the file already exists.
	 * @param {webdav.FileSystemEntryCallback} [successCallback]
	 *      A method to be called once the {@link webdav.FileSystemEntryCallback} has been created.
	 *      The method receives a single parameter:
	 *      the {@link webdav.FileSystemEntryCallback} object representing the directory in question.
	 * @param {external:ErrorCallback} [errorCallback] - A method to be called if an error occurs. Receives
	 *      as its sole input parameter a {@link external:DOMException} object describing the error which occurred.
	 * @returns {void}
	 */
	getDirectory(
		path = '',
		{create = false, exclusive = false} = {},
		successCallback = () => {},
		errorCallback = () => {}
	) {
		if (path && !path.endsWith('/')) {
			path += '/';
		}

		let url;
		let typeError;
		try {
			url = this.fullPath ? new URL(path, this.fullPath) : new URL(path);
		} catch (exception) {
			if (exception instanceof TypeError) {
				typeError = exception;
			} else {
				throw exception;
			}
		}

		if (typeError || !/^https?:\/\/[^?#]+$/.test(url)) {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(new DOMException(
				typeError || `<${url}> does not match supported URL patterns that the scheme is “https” or “http”,`
					+ ' and neither a query nor a fragment exist.',
				'TypeMismatchError'
			));
			return;
		}

		const client = new XMLHttpRequest();
		client.open('PROPFIND', url);
		client.setRequestHeader('content-type', 'application/xml; charset=UTF-8');
		client.setRequestHeader('depth', '0');
		client.responseType = 'document';
		client.addEventListener('error', function () {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException(`NetworkError when attempting to fetch an entry <${url}>.`, 'NotFoundError')
			);
		});
		client.addEventListener('load', function (event) {
			(async function () {
				if (event.target.status === 207) {
					if (create && exclusive) {
						return Promise.reject(new DOMException(`<${url}> already exists.`, 'PathExistsError'));
					}

					if (event.target.response.getElementsByTagNameNS('DAV:', 'collection')[0]) {
						return new webdav.FileSystemDirectoryEntry({fullPath: event.target.responseURL, metadata: {
							modificationTime: new Date(
								event.target.response.getElementsByTagNameNS('DAV:', 'getlastmodified')[0].textContent
							),
							size: 0,
							eTag: event.target.response.getElementsByTagNameNS('DAV:', 'getetag')[0].textContent,
						}});
					} else {
						return Promise.reject(
							new DOMException(`<${url}> is a file, not a directory.`, 'TypeMismatchError')
						);
					}
				} else if (event.target.status === 404 && create) {
					try {
						const response = await fetch(url, {method: 'MKCOL'});
						return response.ok
							? new webdav.FileSystemDirectoryEntry({fullPath: response.url})
							: Promise.reject(new DOMException(
								`${response.status} ${response.statusText}`,
								'NoModificationAllowedError'
							));
					} catch (exception) {
						if (exception instanceof TypeError) {
							return Promise.reject(new DOMException(exception.message, 'NetworkError'));
						} else {
							throw exception;
						}
					}
				} else {
					return Promise.reject(
						new DOMException(`${event.target.status} ${event.target.statusText}`, 'NotFoundError')
					);
				}
			})()
				.then(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)
				.catch(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent);
		});
		client.send(`<?xml version="1.0" encoding="UTF-8"?>
			<propfind xmlns="DAV:">
				<prop>
					<resourcetype />
					<getlastmodified />
					<getcontentlength />
					<getetag />
				</prop>
			</propfind>`);
	}

	/**
	 * Deletes a directory and all of its contents, including the contents of subdirectories.
	 * @see [FileSystemDirectoryEntry.removeRecursively() — Web APIs | MDN]{@link
	 *      https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryEntry/removeRecursively}
	 * @see [File API: Directories and System]{@link
	 *      https://www.w3.org/TR/2012/WD-file-system-api-20120417/#the-directoryentry-interface}
	 * @param {external:VoidCallback} successCallback
	 *      A function to call once the directory removal process has completed. The callback has no parameters.
	 * @param {external:ErrorCallback} [errorCallback]
	 *      A function to be called if an error occurs while attempting to remove the directory subtree.
	 *      Receives a {@link external:DOMException} describing the error which occurred as input.
	 * @returns {void}
	 */
	removeRecursively(successCallback, errorCallback = () => {})
	{
		(async () => {
			if (this.fullPath === '') {
				return Promise.reject(new DOMException(
					'The directory associated with the root of the file system can not be removed.',
					'NotSupportedError'
				));
			}

			const response = await fetch(this.fullPath, {method: 'DELETE'});
			if (response.ok) {
				(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)();
			} else {
				return Promise.reject(new DOMException(
					`${response.status} ${response.statusText}`,
					response.status === 404 ? 'NotFoundError' : 'TypeMismatchError'
				));
			}
		})().catch(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent);
	}
};

/**
 * Created by calling {@link webdav.FileSystemDirectoryEntry.createReader},
 * this interface provides the functionality which lets you read the contents of a directory.
 * @see [FileSystemDirectoryReader — Web APIs | MDN]{@link
 *      https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryReader}
 */
webdav.FileSystemDirectoryReader = class {
	/**
	 * @hideconstructor
	 * @param {Object} params
	 * @param {webdav.FileSystemDirectoryEntry} params.directoryEntry
	 */
	constructor({directoryEntry})
	{
		/**
		 * @access private
		 * @type {webdav.FileSystemDirectoryEntry}
		 */
		this.directoryEntry = directoryEntry;

		/**
		 * @access private
		 * @type {boolean}
		 */
		this.readingFlag = false;

		/**
		 * @access private
		 * @type {boolean}
		 */
		this.doneFlag = false;

		/**
		 * @access private
		 * @type {?DOMException}
		 */
		this.readerError = null;
	}

	/**
	 * Returns a an array containing some number of the directory’s entries.
	 * Each item in the array is an object based on FileSystemEntry
	 * —typically either {@link webdav.FileSystemFileEntry} or {@link webdav.FileSystemDirectoryEntry}.
	 * @see [FileSystemDirectoryReader.readEntries() — Web APIs | MDN]{@link
	 *      https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryReader/readEntries}
	 * @param {webdav.FileSystemEntriesCallback} successCallback
	 *      A function which is called when the directory’s contents have been retrieved.
	 *      The function receives a single input parameter:
	 *      an array of file system entry objects, each based on {@link webdav.FileSystemEntry}.
	 *      Generally, they are either {@link webdav.FileSystemFileEntry} objects, which represent standard files,
	 *      or {@link webdav.FileSystemDirectoryEntry} objects, which represent directories.
	 *      If there are no files left, or you’ve already called readEntries() on this FileSystemDirectoryReader,
	 *      the array is empty.
	 * @param {external:ErrorCallback} [errorCallback]
	 *      A callback function which is called if an error occurs while reading from the directory.
	 *      It receives one input parameter: a {@link external:DOMException} object describing the error which occurred.
	 * @returns {void}
	 */
	readEntries(successCallback, errorCallback = () => {})
	{
		if (this.readingFlag) {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException('The reader is during operation.', 'InvalidStateError')
			);
		} else if (this.readerError) {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(this.readerError);
		} else if (this.doneFlag) {
			(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)([]);
		} else {
			this.readingFlag = true;

			const client = new XMLHttpRequest();
			client.open('PROPFIND', this.directoryEntry.fullPath);
			client.setRequestHeader('content-type', 'application/xml; charset=UTF-8');
			client.setRequestHeader('depth', '1');
			client.responseType = 'document';
			client.addEventListener('error', function () {
				this.readerError = new DOMException(
					`NetworkError when attempting to fetch child entries of <${this.directoryEntry.fullPath}>.`,
					'NetworkError'
				);
				this.readingFlag = false;
				(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(this.readerError);
			});
			client.addEventListener('load', event => {
				if (event.target.status === 207) {
					const responses = event.target.response.getElementsByTagNameNS('DAV:', 'response');

					const entries = [];
					for (let i = 1, l = responses.length; i < l; i++) {
						const url = responses[i].getElementsByTagNameNS('DAV:', 'href')[0].textContent;
						const isDirectory = responses[i].getElementsByTagNameNS('DAV:', 'collection')[0];
						entries.push(new webdav[isDirectory ? 'FileSystemDirectoryEntry' : 'FileSystemFileEntry']({
							fullPath: new URL(url, this.directoryEntry.fullPath).href,
							metadata: {
								modificationTime: new Date(
									responses[i].getElementsByTagNameNS('DAV:', 'getlastmodified')[0].textContent
								),
								size: isDirectory ? 0 : Number.parseInt(
									responses[i].getElementsByTagNameNS('DAV:', 'getcontentlength')[0].textContent
								),
								eTag: responses[i].getElementsByTagNameNS('DAV:', 'getetag')[0].textContent,
							},
						}));
					}

					this.doneFlag = true;
					this.readingFlag = false;
					(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)(entries);
				} else {
					this.readingFlag = false;
					this.readerError = new DOMException(`${event.target.status} ${event.target.statusText}`);
					(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(this.readerError);
				}
			});
			client.send(`<?xml version="1.0" encoding="UTF-8"?>
				<propfind xmlns="DAV:">
					<prop>
						<resourcetype />
						<getlastmodified />
						<getcontentlength />
						<getetag />
					</prop>
				</propfind>`);
		}
	}
};

/**
 * Represents a single file in a file system.
 * @see [FileSystemFileEntry — Web APIs | MDN]{@link https://developer.mozilla.org/docs/Web/API/FileSystemFileEntry}
 */
webdav.FileSystemFileEntry = class extends webdav.FileSystemEntry {
	/** @inheritdoc */
	constructor(...args)
	{
		super(...args);
		this.isFile = true;
	}

	/**
	 * Creates a new FileWriter object which allows writing to the file represented by the file system entry.
	 * @see [FileSystemFileEntry.createWriter() — Web APIs | MDN]{@link
	 *      https://developer.mozilla.org/docs/Web/API/FileSystemFileEntry/createWriter}
	 * @see [File API: Directories and System]{@link
	 *      https://www.w3.org/TR/2012/WD-file-system-api-20120417/#widl-FileEntry-createWriter-void-FileWriterCallback-successCallback-ErrorCallback-errorCallback}
	 * @param {webdav.FileWriterCallback} successCallback
	 *      A callback function which is called when the {@link webdav.FileWriter} has been created successfully;
	 *      the {@link webdav.FileWriter} is passed into the callback as the only parameter.
	 * @param {external:ErrorCallback} [errorCallback] - If provided, this must be a method
	 *      which is caled when an error occurs while trying to create the {@link webdav.FileWriter}.
	 *      This callback receives as input a {@link external:DOMException} object describing the error.
	 * @returns {void}
	 */
	createWriter(successCallback)
	{
		(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)(
			new webdav.FileWriter({fileEntry: this})
		);
	}

	/**
	 * Creates a new File object which can be used to read the file.
	 * @see [FileSystemFileEntry.file() — Web APIs | MDN]{@link
	 *      https://developer.mozilla.org/docs/Web/API/FileSystemFileEntry/file}
	 * @param {external:FileCallback} successCallback
	 *      A callback function which is called when the {@link external:File} has been created successfully;
	 *      the {@link external:File} is passed into the callback as the only parameter.
	 * @param {external:ErrorCallback} [errorCallback] - If provided,
	 *      this must be a method which is caled when an error occurs while trying to create the {@link external:File}.
	 *      This callback receives as input a {@link external:DOMException} object describing the error.
	 * @returns {void}
	 */
	file(successCallback, errorCallback = () => {})
	{
		fetch(this.fullPath).then(function (response) {
			if (response.ok) {
				response.blob()
					.then(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent);
			} else {
				return Promise.reject(
					new DOMException(
						`${response.status} ${response.statusText}`,
						response.status === 404 ? 'NotFoundError' : 'TypeMismatchError'
					)
				);
			}
		}).catch(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent);
	}
};

/**
 * This interface provides methods to monitor the asynchronous writing of blobs to disk using event handler attributes
 * and allow saving an Blob.
 * @see [File API: Writer]{@link https://www.w3.org/TR/2012/WD-file-writer-api-20120417/#the-filewriter-interface}
 */
webdav.FileWriter = class {
	/**
	 * @hideconstructor
	 * @param {Object} params
	 * @param {webdav.FileSystemFileEntry} params.fileEntry
	 */
	constructor({fileEntry})
	{
		/**
		 * @access private
		 * @type {webdav.FileSystemFileEntry}
		 */
		this.fileEntry = fileEntry;
	}

	/**
	 * Write the supplied data to the file.
	 * @see [File API: Writer]{@link
	 *      https://www.w3.org/TR/2012/WD-file-writer-api-20120417/#widl-FileWriter-write-void-Blob-data}
	 * @param {Blob} data The blob to write.
	 * @returns {void}
	 */
	write(data)
	{
		fetch(this.fileEntry.fullPath, {method: 'PUT', body: data}).then(response => {
			if (response.ok) {
				/**
				 * Handler for write events.
				 * @see [onwrite | 5. The FileSaver interface | File API: Writer]{@link
				 *      https://www.w3.org/TR/2012/WD-file-writer-api-20120417/#widl-FileSaver-onwrite}
				 * @type {?Function}
				 */
				if (this.onwrite) {
					this.onwrite(new ProgressEvent('write'));
				}
			} else {
				return Promise.reject(new DOMException(`${response.status} ${response.statusText}`));
			}
		}).catch(exception => {
			/**
			 * The last error that occurred on the {@link webdav.FileWriter}.
			 * @see [error | 5. The FileSaver interface | File API: Writer]{@link
			 *      https://www.w3.org/TR/2012/WD-file-writer-api-20120417/#widl-FileSaver-error}
			 * @readonly
			 * @type {external:DOMException}
			 */
			this.error = exception;

			/**
			 * Handler for error events.
			 * @see [onerror | 5. The FileSaver interface | File API: Writer]{@link
			 *      https://www.w3.org/TR/2012/WD-file-writer-api-20120417/#widl-FileSaver-onerror}
			 * @type {?Function}
			 */
			if (this.onerror) {
				this.onerror(new ProgressEvent('error'));
			}
		});
	}
};

/**
 * A dummy {@link webdav.FileSystemDirectoryEntry} object which be used as the file system’s root directory.
 * Through this object, you can gain access to all files and directories in the file system.
 * @type {webdav.FileSystemDirectoryEntry}
 */
webdav.root = new webdav.FileSystemDirectoryEntry({fullPath: ''});
