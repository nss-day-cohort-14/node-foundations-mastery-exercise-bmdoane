#!/usr/bin/env node
// @morecallan
"use strict"

const [,, ...arg] = process.argv
const { createReadStream } = require('fs')
const findWord = require('./limit-ten')
const { split } = require('event-stream')

const readStream = createReadStream('/usr/share/dict/words')

readStream
	.pipe(split())
	.pipe(findWord)
	.pipe(process.stdout)