#!/usr/bin/env node
"use strict"

const [,, ...arg] = process.argv
// Object destructuring
const { map } = require('event-stream')

let count = 0
const findWord = map((line, cb) => {
	// CLI args come in as strings and not necessary to interp
	// toLowerCase used on condition and arg does not affect data stream
	if (line.toString().toLowerCase().startsWith(arg[0].toLowerCase()) && (count < 10)) {
		cb(null, line.toString())
		count++
	}
	// This says don't pass anything down pipe
	cb()
})

module.exports = findWord