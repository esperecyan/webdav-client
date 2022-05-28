@esperecyan/webdav-client
=========================
This is the WebDAV client library which is designed like [File and Directory Entries API] \([MDN]).

[File and Directory Entries API]: https://wicg.github.io/entries-api/ "This specification documents web browser support for file and directory upload by drag-and-drop operations. It introduces types representing directories with methods for asynchronous traversal, and extends HTMLInputElement and DataTransferItem."
[MDN]: https://developer.mozilla.org/docs/Web/API/File_and_Directory_Entries_API "The File and Directory Entries API simulates a local file system that web apps can navigate within and access files in. You can develop apps which read, write, and create files and/or directories in a virtual, sandboxed file system."

Example
-------

```js
webdav.root.getDirectory('http://localhost:52328/qynnsgspuz6cm2sui/', {}, function (directory) {
	directory.createReader().readEntries(function (entries) {
		for (const entry of entries) {
			console.log(`[${entry.isDirectory ? 'Directory' : 'File'}] ${entry.name}`);
		}
	}, console.error);
}, console.error);
```

Usage
-----

```html
<script src="webdav.js"></script>
```

### Download
https://github.com/esperecyan/webdav-client/releases

Or

`npm install @esperecyan/webdav-client`

Or

`bower install esperecyan-webdav-client`

API list
--------
https://esperecyan.github.io/webdav-client/index.html

Supports
--------
- Microsoft Edge 15 or later
- Firefox
- Firefox ESR
- Opera
- Google Chrome
- Safari

Contribution
------------
Please Pull Request or open your Issue.

Licence
-------
This library is licensed under the [Mozilla Public License Version 2.0] \(MPL-2.0).

[Mozilla Public License Version 2.0]: https://www.mozilla.org/MPL/2.0/
