
module.exports = parseArgs = () => {
    const parseArgs = require('minimist');
    const process = require('process');
    const arg = parseArgs(process.argv.slice(2));

    if ((arg.a || arg.action)
        && (arg.s || arg.shift)
        && (arg.a === 'encode' || arg.a === 'decode' || arg.action === 'encode' || arg.action === 'decode')
        && (typeof arg.s === 'number' || typeof arg.shift === 'number')) {
        return (
            {
                shift: arg.s || arg.shift,
                action: arg.a || arg.action,
                inputFile: arg.i || arg.input,
                outputFile: arg.o || arg.output
            }
        );
    }
    console.error('error: required option "-a, --action string" , "-s, --shift number" not specified')
    process.exit(9);
};

