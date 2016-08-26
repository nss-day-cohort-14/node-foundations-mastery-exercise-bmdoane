#!/usr/bin/env node
"use strict"

const { Writable } = require('stream')

const writeStream = Writable()
// writeStream is end of chain.  It has no destination.

writeStream._write = (buffer, encoding, cb) => {
	//console.log('_write', buffer encoding)
	process.stdout.write(`${buffer}\n`)
	setTimeout(cb, 500)

}

module.exports = writeStream