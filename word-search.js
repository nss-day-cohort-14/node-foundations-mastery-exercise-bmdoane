#!/usr/bin/env node
// @morecallan
"use strict"


const { createReadStream } = require('fs')
const transformer = require('./limit-ten')
const { split } = require('event-stream')

const readStream = createReadStream('/usr/share/dict/words')

readStream
	.pipe(split())
	.pipe(transformer)
	.pipe(process.stdout)