#!/usr/bin/env node
"use strict"

const [,, ...arg] = process.argv
const { Transform } = require('stream')
const { map } = require('event-stream')

const findWord = map((line, cb) => {
	// CLI args come in as strings and not necessary to interp
	if (line.toString().startsWith(arg[0])) {
		cb(null, line.toString())
	}
	// This says don't pass anything down pipe
	cb()
})

// // Example of catching an error
// transformer.on('error', () => {
// 	console.log('I found an error')
// })

module.exports = findWord