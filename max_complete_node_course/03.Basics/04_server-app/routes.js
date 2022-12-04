const fs = require("fs");
const path = require("path");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="post"><input type="text" name="message"><button type="submit">Submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const filePath = path.join(__dirname, "message.txt");
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile(filePath, message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><p>Hello from Node.js</p></body>");
  res.write("</html>");
  res.end();
};

// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: 'Some Text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some Text';

exports.handler = requestHandler;
exports.someText = 'Some Text';
