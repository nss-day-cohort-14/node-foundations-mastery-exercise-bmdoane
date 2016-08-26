#!/usr/bin/env node
// @morecallan
"use strict"

const [,, ...arg] = process.argv
const { createReadStream } = require('fs')
const transformer = require('./limit-ten')
// const writer = require('./write-stream')

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