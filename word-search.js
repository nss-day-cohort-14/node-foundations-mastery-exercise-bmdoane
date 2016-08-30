#!/usr/bin/env node
// @morecallan
"use strict"

const [,, ...arg] = process.argv
const { createReadStream } = require('fs')
const { split, map } = require('event-stream')
const searchLimit = require('./limit-ten')
const path = require('path')
const delay = require('./delay-it')

// CLI args come in as strings and not necessary to interp
if (arg[0]) {
	const readStream = createReadStream('/usr/share/dict/words')

	readStream
		// Splits data into chunks by line
		.pipe(split())
		// Filters data
		.pipe(map((data, cb) => {
				// toLowerCase used on condition and arg does not affect data stream
				if (data.toString().toLowerCase().startsWith(arg[0].toLowerCase())) {
					// This passes down pipe
					cb(null, data)
				} else {
					// This says don't pass anything down pipe that doesn't match
					cb()
				}
		}))
		.pipe(searchLimit)
		.pipe(delay)
		.pipe(process.stdout)
} else {
	// Placing if/else outside map, kept psw from repeating
	process.stdout.write(`Usage: ${(path.basename(__filename))} [searchterm]\n` )
}		
