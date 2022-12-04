const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
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
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    // This fixes the error we can get when trying to move to '/' 
    // after the rest of function occurred

    // return req.on('end', () => { 
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync(filePath, message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  // This gets executed right after the start of buffering, so too early, which causes an error after
  // when the buffering completes and the redirection to '/' occurs
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><p>Hello from Node.js</p></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
