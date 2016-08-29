#!/usr/bin/env node
// @morecallan
"use strict"

const [,, ...arg] = process.argv
const { createReadStream } = require('fs')
const { split, map } = require('event-stream')
const searchLimit = require('./limit-ten')
//const path = require('path')
// const delay = require('./delay-it')

const readStream = createReadStream('/usr/share/dict/words')

readStream
	.pipe(split())
	.pipe(map(function(data, cb) {
		// CLI args come in as strings and not necessary to interp
		// toLowerCase used on condition and arg does not affect data stream
		if (data.toString().toLowerCase().startsWith(arg[0].toLowerCase())) {
			// This passes down pipe
			cb(null, data)
		} else {
			// This says don't pass anything down pipe
			cb()
		}
	}))
	.pipe(searchLimit)
	.pipe(process.stdout)



	// if (arg[0] === null) {
// 	process.stdout.write(`Usage: ${(path.basename(__filename))} [searchterm]` )
// }