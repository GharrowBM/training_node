const fs = require("fs");
const path = require('path');

const text = `Hello
from
Node.js`;

fs.writeFileSync(path.join(__dirname, 'file.txt'), text);

console.log("Hello from Node.js");
