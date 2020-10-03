const through2 = require('through2');
const encrypt = require('./src/encrypt');
const fs = require('fs')
const parseArgs = require('./src/parseArgs')
const path = require('path');

const { shift, action, inputFile, outputFile } = parseArgs();

const encr = through2(function (chunk, enc, callback) {
    encrypt(chunk, shift, action === 'encode')
    this.push(chunk)
    callback()
})

console.log('args!!::', shift, action, inputFile, outputFile)

if (typeof inputFile !== 'string' && typeof outputFile !== 'string') {
    console.log('1')
    process.stdin.pipe(encr).pipe(process.stdout)
}

else if (typeof inputFile !== 'string') {
    console.log('2')
    const writeStream = fs.createWriteStream(path.resolve(__dirname, outputFile), { 'flags': 'a' });
    writeStream.on('error', function (err) {
        console.error('Error creating write stream', err);
        process.exit(9);
    });
    process.stdin
        .pipe(encr)
        .pipe(writeStream)
}
else if (typeof outputFile !== 'string') {
    console.log('3')
    const readStream = fs.createReadStream(path.resolve(__dirname, inputFile));
    readStream.on('error', function (err) {
        console.error(`"${inputFile}": is wrong path to input file`);
        process.exit(9);
    });
    readStream.pipe(encr).pipe(process.stdout);
}
else {
    console.log('4')
    const readStream = fs.createReadStream(path.resolve(__dirname, inputFile));
    readStream.on('error', function (err) {
        console.error(`"${inputFile}": is wrong path to input file`);
        process.exit(9);
    });
    readStream
        .pipe(encr)
        .pipe(fs.createWriteStream(path.resolve(__dirname, outputFile), { 'flags': 'a' }))
}