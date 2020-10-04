# Caesar cipher CLI tool

### Usage

```
git clone https://github.com/Lavitr/cipher-cli.git
cd cipher-cli
npm install
```

### CLI tool should accept 4 options (short alias and full name):

-s, --shift: a shift
-i, --input: an input file
-o, --output: an output file
-a, --action: an action encode/decode

### Command example:

```
$ node index -a encode -s 7 -i "./ex.txt" -o "./out.txt"
$ node index --action encode --shift 7 --input ex.txt --output out.txt
$ node index --action encode --shift 7 --input ex.txt
```

