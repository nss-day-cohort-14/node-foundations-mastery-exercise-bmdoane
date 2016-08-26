#!/usr/bin/env node
// @morecallan
"use strict"

const [,, ...arg] = process.argv
const { createReadStream } = require('fs')
const es = require('event-stream')
const transformer = require('./limit-ten')
const searchTerm = `${arg}`

const readStream = createReadStream('/usr/share/dict/words', { highWaterMark: 1 })

readStream.on('data', buffer => {
	readStream.pause(buffer.toString())
	//process.stdout.write(buffer.toString())
})

const timer = setInterval(() => readStream.resume(), 50)

readStream.on('end', () => {
	console.log('end')
	clearInterval(timer)
})

readStream
	.pipe(transformer)
	.pipe(process.stdout)


// const readStream = createReadStream('/usr/share/dict/words', { highWaterMark: 1 })

// readStream.on('data', buffer => {
// 	readStream.pause(buffer.toString())
// 	//process.stdout.write(buffer.toString())
// })

// const timer = setInterval(() => readStream.resume(), 50)

// readStream.on('end', () => {
// 	console.log('end')
// 	clearInterval(timer)
// })

// readStream
// 	.pipe(transformer)
// 	.pipe(process.stdout)