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

if (typeof inputFile !== 'string' && typeof outputFile !== 'string') {
    process.stdin.pipe(encr).pipe(process.stdout)
} else if (typeof inputFile !== 'string') {
    fs.access(path.resolve(__dirname, outputFile), fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
            console.error(
                `${path.resolve(__dirname, outputFile)} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
        } else {
            process.stdin
                .pipe(encr)
                .pipe(fs.createWriteStream(path.resolve(__dirname, outputFile), { 'flags': 'a' }))
        }
    });
} else if (typeof outputFile !== 'string') {
    const readStream = fs.createReadStream(path.resolve(__dirname, inputFile));
    readStream.on('error', function (err) {
        console.error(`"${inputFile}": is wrong path to input file`);
        process.exit(9);
    });
    readStream.pipe(encr).pipe(process.stdout);
} else {
    fs.access(path.resolve(__dirname, outputFile), fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
            console.error(
                `${path.resolve(__dirname, outputFile)} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
        } else {
            const readStream = fs.createReadStream(path.resolve(__dirname, inputFile));
            readStream.on('error', function (err) {
                console.error(`"${inputFile}": is wrong path to input file`);
                process.exit(9);
            });
            readStream
                .pipe(encr)
                .pipe(fs.createWriteStream(path.resolve(__dirname, outputFile), { 'flags': 'a' }))
        }
    });
}