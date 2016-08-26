#!/usr/bin/env node
"use strict"

const { Transform } = require('stream')

const ts = Transform({
	// Enhanced object literal
	transform (buff, enc, cb) {
		cb(null, buff.toString().toUpperCase())
	}
})

// // Example of catching an error
// transformer.on('error', () => {
// 	console.log('I found an error')
// })

module.exports = ts