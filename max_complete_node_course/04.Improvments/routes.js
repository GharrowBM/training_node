const users = [
  { username: "Albert" },
  { username: "Marie" },
  { username: "Mark" },
  { username: "Sandra" },
];

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Home Page</title></head>");
    res.write("<body><p>Welcome to my page!</p>");
    res.write(
      `<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form>`
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
      users.push({ username });
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  } else if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Home Page</title></head>");
    res.write("<body><h1>Users List</h1><ul>") >
      users.forEach((u) => {
        res.write(`<li>${u.username}</li>`);
      });
    res.write("</ul></body>");
    res.write("</html>");
    return res.end();
  }
};

exports.handler = requestHandler;
