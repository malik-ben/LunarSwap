let data = `{"swap":{"belief_price": 1.0445}}`;
let buff = new Buffer(data);
let base64data = buff.toString('base64');

console.log('"' + data + '" converted to Base64 is "' + base64data + '"');