module.exports = encrypt = (chunk, s, isEncode) => {
    const shift = s % 26;
    for (let i = 0; i < chunk.length; i++) {
        if (isEncode) {
            if (97 <= chunk[i] && chunk[i] <= 122) {
                chunk[i] = chunk[i] + shift <= 122 ? chunk[i] + shift : (96 + ((chunk[i] + shift) - 122))
            }
            if (65 <= chunk[i] && chunk[i] <= 90) {
                chunk[i] = chunk[i] + shift <= 90 ? chunk[i] + shift : (64 + ((chunk[i] + shift) - 90))
            }
        } else {
            if (97 <= chunk[i] && chunk[i] <= 122) {
                chunk[i] = chunk[i] - shift >= 97 ? chunk[i] - shift : (123 - (97 - (chunk[i] - shift)))
            }
            if (65 <= chunk[i] && chunk[i] <= 90) {
                chunk[i] = chunk[i] - shift >= 65 ? chunk[i] - shift : (91 - (65 - (chunk[i] - shift)))
            }
        }
    }
    return chunk
}