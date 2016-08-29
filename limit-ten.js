#!/usr/bin/env node
"use strict"

// Object destructuring
const { Transform } = require('stream')

let count = 0

const searchLimit = Transform({
	transform (buffer, _, cb) {
		if (count < 10) {
			cb(null, `${buffer.toString()}\n`)
			count++
		} else {
		// This says don't pass anything down pipe
			cb()
		}
	}	
})

module.exports = searchLimit


